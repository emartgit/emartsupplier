export type Lang = 'en' | 'zh' | 'ms';

export const translations = {
  en: {
    // SelectSupplierPage
    title: 'Supplier Portal',
    subtitle: 'Select your company to continue',
    supplierName: 'Supplier Name',
    searchPlaceholder: 'Type to search your company name…',
    next: 'Next',
    onlyUnsubmitted: 'Only suppliers who have not yet submitted their codes are listed.',
    selectValidation: 'Please select your supplier name from the list.',
    selectedPrefix: '✓ Selected: ',

    // EnterCodesPage
    enterCodesTitle: 'Enter Your System Codes',
    supplierPrefix: 'Supplier: ',
    allMandatory: 'All fields are mandatory.',
    back: '← Back',
    codePlaceholder: 'Enter your system code',
    submit: 'Submit',
    submitting: 'Submitting…',
    fieldRequired: 'This field is required.',
    atLeastOne: 'Please fill in at least one system code before submitting.',

    // SuccessPage
    successTitle: 'Submission Successful',
    thankYouPrefix: 'Thank you, ',
    codesRecorded: 'Your system codes have been recorded.',
    closeWindow: 'You may close this window.',

    // Layout
    ourBrands: 'Our Family of Brands',
    switchDark: 'Switch to dark mode',
    switchLight: 'Switch to light mode',
    switchLang: 'BM',

    // Footer
    allRightsReserved: 'All rights reserved.',
    builtBy: 'Product built by',
    dept: 'IT & MIS Department',

    // Success page
    redirecting: 'Redirecting to home in {n}s…',

    // Confirm modal
    confirmTitle: 'Confirm Submission',
    confirmDesc: 'Please review your details before submitting.',
    confirmSupplier: 'Supplier',
    confirmCancel: 'Cancel',
    confirmSubmit: 'Confirm & Submit',
    notProvided: '— (not provided)',

    // Combobox
    showingFirst50: 'Showing first 50 results — type more to narrow down',
    noSupplierFound: 'No supplier found',
  },
  zh: {
    title: '供应商门户',
    subtitle: '请选择您的公司以继续',
    supplierName: '供应商名称',
    searchPlaceholder: '输入关键字搜索公司名称…',
    next: '下一步',
    onlyUnsubmitted: '仅显示尚未提交代码的供应商。',
    selectValidation: '请从列表中选择您的供应商名称。',
    selectedPrefix: '✓ 已选择：',

    enterCodesTitle: '输入您的系统代码',
    supplierPrefix: '供应商：',
    allMandatory: '所有字段均为必填。',
    back: '← 返回',
    codePlaceholder: '请输入系统代码',
    submit: '提交',
    submitting: '提交中…',
    fieldRequired: '此字段为必填项。',
    atLeastOne: '请至少填写一个系统代码后再提交。',

    successTitle: '提交成功',
    thankYouPrefix: '谢谢您，',
    codesRecorded: '您的系统代码已成功记录。',
    closeWindow: '您可以关闭此窗口。',

    ourBrands: '我们的品牌家族',
    switchDark: '切换到深色模式',
    switchLight: '切换到浅色模式',
    switchLang: 'EN',

    allRightsReserved: '版权所有。',
    builtBy: '产品由',
    dept: 'IT与MIS部门 开发',

    redirecting: '{n}秒后返回首页…',

    confirmTitle: '确认提交',
    confirmDesc: '请在提交前核对以下信息。',
    confirmSupplier: '供应商',
    confirmCancel: '取消',
    confirmSubmit: '确认提交',
    notProvided: '— (未填写)',

    showingFirst50: '显示前50个结果，请继续输入以缩小范围',
    noSupplierFound: '未找到相关供应商',
  },
  ms: {
    title: 'Portal Pembekal',
    subtitle: 'Pilih syarikat anda untuk meneruskan',
    supplierName: 'Nama Pembekal',
    searchPlaceholder: 'Taip untuk mencari nama syarikat anda…',
    next: 'Seterusnya',
    onlyUnsubmitted: 'Hanya pembekal yang belum menghantar kod disenaraikan.',
    selectValidation: 'Sila pilih nama pembekal anda daripada senarai.',
    selectedPrefix: '✓ Dipilih: ',

    enterCodesTitle: 'Masukkan Kod Sistem Anda',
    supplierPrefix: 'Pembekal: ',
    allMandatory: 'Semua medan adalah wajib.',
    back: '← Kembali',
    codePlaceholder: 'Masukkan kod sistem anda',
    submit: 'Hantar',
    submitting: 'Menghantar…',
    fieldRequired: 'Medan ini diperlukan.',
    atLeastOne: 'Sila isi sekurang-kurangnya satu kod sistem sebelum menghantar.',

    successTitle: 'Penghantaran Berjaya',
    thankYouPrefix: 'Terima kasih, ',
    codesRecorded: 'Kod sistem anda telah direkodkan.',
    closeWindow: 'Anda boleh menutup tetingkap ini.',

    ourBrands: 'Jenama Kami',
    switchDark: 'Tukar ke mod gelap',
    switchLight: 'Tukar ke mod cerah',
    switchLang: '中文',   /* ms → zh next */

    allRightsReserved: 'Hak cipta terpelihara.',
    builtBy: 'Produk dibina oleh',
    dept: 'Jabatan IT & MIS',

    redirecting: 'Mengalih dalam {n}s…',

    confirmTitle: 'Sahkan Penghantaran',
    confirmDesc: 'Sila semak maklumat anda sebelum menghantar.',
    confirmSupplier: 'Pembekal',
    confirmCancel: 'Batal',
    confirmSubmit: 'Sahkan & Hantar',
    notProvided: '— (tidak diberikan)',

    showingFirst50: 'Menunjukkan 50 keputusan pertama — taip lebih untuk menyempitkan',
    noSupplierFound: 'Tiada pembekal ditemui',
  },
} as const;

export type Translations = Record<keyof typeof translations.en, string>;
