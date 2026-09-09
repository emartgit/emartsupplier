import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

interface Props {
  suppliers: string[];
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export default function SupplierCombobox({ suppliers, value, onChange, disabled }: Props) {
  const { t } = useLanguage();
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim().length < 2
    ? []
    : suppliers.filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 50);

  function select(name: string) {
    setQuery(name);
    onChange(name);
    setOpen(false);
  }

  function handleInput(val: string) {
    setQuery(val);
    onChange('');
    setOpen(true);
  }

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Input
        placeholder={t.searchPlaceholder}
        value={query}
        onChange={e => handleInput(e.target.value)}
        onFocus={() => query.trim().length >= 2 && setOpen(true)}
        disabled={disabled}
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto custom-scroll rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-xl text-sm text-gray-900 dark:text-gray-100 py-1">
          {filtered.map((name, i) => (
            <li
              key={i}
              className={cn(
                'mx-1 px-3 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2',
                'hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300',
                name === value
                  ? 'bg-blue-50 dark:bg-blue-900/40 font-semibold text-blue-700 dark:text-blue-300'
                  : 'text-gray-800 dark:text-gray-200'
              )}
              onMouseDown={() => select(name)}
            >
              {name === value && (
                <svg className="w-3.5 h-3.5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              <span className={name === value ? '' : 'pl-5'}>{name}</span>
            </li>
          ))}
          {suppliers.filter(s => s.toLowerCase().includes(query.toLowerCase())).length > 50 && (
            <li className="px-4 py-2 text-gray-400 dark:text-gray-500 italic text-xs border-t border-gray-100 dark:border-gray-700 mt-1">
              {t.showingFirst50}
            </li>
          )}
        </ul>
      )}
      {open && query.trim().length >= 2 && filtered.length === 0 && (
        <div className="absolute z-50 w-full mt-1 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-md px-3 py-2 text-sm text-gray-400 dark:text-gray-500">
          {t.noSupplierFound}
        </div>
      )}
    </div>
  );
}
