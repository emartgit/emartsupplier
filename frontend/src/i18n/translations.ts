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

    // Help modal
    helpTitle: 'Help & FAQ',
    helpQ1: 'What are these system codes?',
    helpA1: 'These are your supplier account codes in our retail system. Each location (Batu Kawa, Riam, Bintulu) has its own code.',
    helpQ2: 'Where do I find my codes?',
    helpA2: 'Log in to your supplier/ERP system and look for your account code. It may be labelled "Account Code" or "Supplier Code" per outlet.',
    helpQ3: 'My company is not in the list — what do I do?',
    helpA3: 'Contact the IT & MIS Department to have your company added to the system.',
    helpQ4: 'Who do I contact for help?',
    helpA4: 'Reach out to the IT & MIS Department via your Emart representative.',
    helpClose: 'Close',
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

    helpTitle: '帮助与常见问题',
    helpQ1: '这些系统代码是什么？',
    helpA1: '这些是您在我们零售系统中的供应商账户代码。每个地点（Batu Kawa、Riam、Bintulu）都有独立的代码。',
    helpQ2: '我在哪里可以找到我的代码？',
    helpA2: '登录您的供应商/ERP系统，查找账户代码，通常标注为各门店的"账户代码"或"供应商代码"。',
    helpQ3: '我的公司不在列表中，怎么办？',
    helpA3: '请联系 IT & MIS 部门，将您的公司添加到系统中。',
    helpQ4: '我需要帮助，应该联系谁？',
    helpA4: '请通过您的 Emart 代表联系 IT & MIS 部门。',
    helpClose: '关闭',
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

    helpTitle: 'Bantuan & Soalan Lazim',
    helpQ1: 'Apakah kod sistem ini?',
    helpA1: 'Ini adalah kod akaun pembekal anda dalam sistem runcit kami. Setiap lokasi (Batu Kawa, Riam, Bintulu) mempunyai kod tersendiri.',
    helpQ2: 'Di mana saya boleh mencari kod saya?',
    helpA2: 'Log masuk ke sistem pembekal/ERP anda dan cari kod akaun anda. Ia mungkin dilabelkan sebagai "Kod Akaun" atau "Kod Pembekal" bagi setiap cawangan.',
    helpQ3: 'Syarikat saya tiada dalam senarai — apa yang perlu saya lakukan?',
    helpA3: 'Hubungi Jabatan IT & MIS untuk menambah syarikat anda ke dalam sistem.',
    helpQ4: 'Siapa yang perlu saya hubungi untuk mendapatkan bantuan?',
    helpA4: 'Hubungi Jabatan IT & MIS melalui wakil Emart anda.',
    helpClose: 'Tutup',
  },
} as const;

export type Translations = Record<keyof typeof translations.en, string>;
