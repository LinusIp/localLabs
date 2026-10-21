// The page's words in its three languages. English is the original; the
// Russian and Uzbek (Latin script) are read by the founder before anything
// goes live. smartScreen, smartAppControl and ways.server.write hold markup.

export const STRINGS = {
  en: {
    langName: "EN",
    title: "localSpace — your computer can run its own AI",
    description:
      "localSpace looks at your computer, recommends a model that suits it and tells you how fast it will write before anything downloads. Everything you type stays on your machine.",
    skip: "Skip to the content",
    nav: {
      sections: "Sections",
      footer: "Footer",
      language: "Language",
      how: "How it works",
      companies: "For companies",
      download: "Download",
      menu: "Menu",
    },
    h1: ["Your computer can run its own AI.", "We will tell you how well."],
    lede:
      "Before anything downloads, it shows which model suits your machine and how many words a second it will write. Everything you type stays on that machine.",
    heroButton: "Download for Windows",
    versionWord: "Version",
    preview: "Preview",
    windows: "Windows 10 or 11, 64-bit",
    heroDetails: "File details and SHA-256",
    demo: {
      label: "On one laptop:",
      gpu: "4 GB graphics card",
      rate: "{t} tokens a second · about {w} words a second",
      caption:
        "Speed once it is writing: Qwen3.5 4B in localSpace 0.2.0-preview.1, measured on 21 October 2026 on a laptop with an NVIDIA GeForce RTX 3050 Ti (4 GB) and 16 GB of memory, in Silent mode. The app tells you yours before you download anything.",
    },
    claimsTitle: "What you can count on",
    claims: [
      ["Nothing leaves your computer", "The app sends nothing: not your questions, not its answers, not a count of how often you use it."],
      ["No subscription, no cost per message", "It runs on the hardware you already have."],
      ["Works with no internet at all", "Once the model is downloaded, it needs no connection."],
    ],
    steps: [
      {
        title: "It looks at your computer before anything downloads",
        text: "The first screen: what it found, the model it recommends for this computer, how fast that model will write and how big the download is.",
        alt: "The first screen of localSpace 0.2.0-preview.1. Under This computer: NVIDIA GeForce RTX 3050 Ti Laptop GPU, 4 GB of graphics memory, 16 GB of system memory. Recommended for it: Qwen3.5 4B, runs well, faster than you read, about 15 to 20 words a second. Most of it fits in the graphics memory; the rest runs from system memory, which is slower. Free to use, also for commercial use. About 3.2 GB to download; drive D: has 12 GB free. A button, Download and start.",
      },
      {
        title: "Every model tells you how it will run",
        text: "We would rather tell you it is slow than have you find out after a 60 GB download.",
        alt: "The models that can be added, in localSpace's settings, under Runs well on this computer, each with how it will run here before it is downloaded. Qwen3.5 4B by Alibaba (Qwen): about 15 to 20 words a second, about 3.2 GB to download. Qwen3.5 9B: about 5 to 7 words a second, about 6.1 GB; it needs most of this computer's memory, so close other programs such as your browser before you use it. Gemma 4 E2B by Google: about 15 to 20 words a second, about 3.2 GB. Gemma 4 E4B: about 7 to 10 words a second, about 4.8 GB. Each is free to use, also for commercial use. Below the list: Show the 2 models that will not fit.",
      },
      {
        title: "Then you type",
        text: "Answers are written on your computer, and your conversations are kept there too.",
        alt: "A conversation in localSpace with Qwen3.5 4B. Asked: What should I check before I buy a used bicycle? It lists seven checks: a test ride for the brakes, gears and handling; the tires; the frame, for cracks and rust; the wheels and spokes; the saddle and seatpost; the chain and derailleur; and the bike's history. It ends: if something is broken or unclear, ask for a repair estimate before paying full price.",
      },
    ],
    ways: {
      title: "Two ways to run it",
      own: {
        title: "On your own computer",
        text: "One app, on your own hardware. There is no account to create and nothing to sign in to.",
      },
      server: {
        title: "On your company's server",
        text: "Employees open it in their browser and sign in with their work email. The model runs on your company's own server, so nothing goes to an outside AI service, and their laptops need no graphics card at all.",
        note: "Company servers are coming soon.",
        write: "Write to us: in our {telegram} or at {email}",
      },
    },
    telegram: "Telegram group",
    mailSubject: "localSpace for our company",
    pending: "given on publish day",
    copy: "Copy",
    copied: "Copied",
    labels: { file: "File", size: "Size", mb: "MB" },
    decimal: ".",
    files: {
      setup: {
        title: "Installer",
        about: "Installs localSpace and adds it to the Start menu.",
        button: "Download the installer",
      },
      portable: {
        title: "Portable zip",
        about: "Nothing is installed: unzip it and start localSpace from the folder.",
        button: "Download the zip",
      },
    },
    dl: {
      title: "Download localSpace",
      lede: "Version {version}, for Windows 10 or 11, 64-bit. This is a preview, so expect rough edges.",
      counted: "The Download buttons count clicks per day and file, and store nothing about you.",
      counterCode: "The counter's code is public.",
      checkTitle: "Check your download",
      checkRun: "In PowerShell, in the folder where the file is, run:",
      checkCompare: "Compare the result with the SHA-256 above. If the two values differ, don't run the file.",
      needsTitle: "What it needs",
      needs: "Windows 10 or 11, 64-bit. Models download separately inside the app: a few GB, chosen for your computer.",
      measured:
        "Measured: Qwen3.5 4B: about 6–7 tokens per second (English answers) on a Core i7 laptop with Intel Iris Xe graphics, no NVIDIA card, 8 GB of memory, with a browser and VS Code open.",
      stopTitle: "If Windows stops the installer",
      smartScreen:
        "If Windows says “Windows protected your PC”, click <strong>More info</strong>, then <strong>Run anyway</strong>.",
      smartAppControl:
        "<strong>If Windows won’t open the installer.</strong> Some computers have Smart App Control turned on, and it may stop programs from new publishers. localSpace isn’t signed yet, so this can happen. We’re working on it. You can check the download is genuine with the SHA-256 above. We don’t recommend turning Smart App Control off.",
      standsTitle: "Where it stands",
      stands: [
        "It can answer about pictures you add to a chat, with a model that reads them.",
        "It cannot read text files or search the web yet.",
        "In a very long chat, the first word can take longer.",
        "There is no telemetry. There is nothing to turn off, because none was written.",
      ],
      communityTitle: "Tell us how it went",
      community:
        "What worked, what broke, and on which computer: tell us in our Telegram group. In the app, Help → Send feedback opens the same group.",
      communityButton: "Join our community",
    },
  },

  ru: {
    langName: "RU",
    title: "localSpace — ваш компьютер может запускать свой ИИ",
    description:
      "localSpace смотрит на ваш компьютер, советует подходящую ему модель и ещё до загрузки говорит, как быстро она будет писать. Всё, что вы пишете, остаётся на вашем компьютере.",
    skip: "Перейти к содержанию",
    nav: {
      sections: "Разделы",
      footer: "Подвал",
      language: "Язык",
      how: "Как это работает",
      companies: "Для компаний",
      download: "Скачать",
      menu: "Меню",
    },
    h1: ["Ваш компьютер может запускать свой ИИ.", "Мы скажем, насколько хорошо."],
    lede:
      "Ещё до загрузки приложение показывает, какая модель подходит вашему компьютеру и сколько слов в секунду она будет писать. Всё, что вы пишете, остаётся на этом компьютере.",
    heroButton: "Скачать для Windows",
    versionWord: "Версия",
    preview: "Предварительная версия",
    windows: "Windows 10 или 11, 64-разрядная",
    heroDetails: "Файлы и SHA-256",
    demo: {
      label: "На одном ноутбуке:",
      gpu: "Видеокарта 4 ГБ",
      rate: "{t} токена в секунду · около {w} слов в секунду",
      caption:
        "Скорость во время ответа: Qwen3.5 4B в localSpace 0.2.0-preview.1, измерено 21 октября 2026 года на ноутбуке с NVIDIA GeForce RTX 3050 Ti (4 ГБ) и 16 ГБ памяти, в режиме Silent. Вопрос и ответ показаны так, как они были написаны, на английском. Приложение скажет вашу скорость до любой загрузки.",
    },
    claimsTitle: "На что можно рассчитывать",
    claims: [
      ["Ничего не покидает ваш компьютер", "Приложение ничего не отправляет: ни ваши вопросы, ни свои ответы, ни даже то, как часто вы им пользуетесь."],
      ["Без подписки и без платы за сообщения", "Оно работает на том железе, что у вас уже есть."],
      ["Работает совсем без интернета", "Когда модель скачана, подключение больше не нужно."],
    ],
    steps: [
      {
        title: "До любой загрузки оно смотрит на ваш компьютер",
        text: "Первый экран: что приложение нашло, какую модель советует этому компьютеру, как быстро она будет писать и сколько нужно скачать.",
        alt: "Первый экран localSpace 0.2.0-preview.1 на английском. В разделе «Этот компьютер»: NVIDIA GeForce RTX 3050 Ti Laptop GPU, 4 ГБ видеопамяти, 16 ГБ оперативной памяти. Рекомендовано: Qwen3.5 4B, работает хорошо, быстрее, чем вы читаете, около 15–20 слов в секунду. Большая часть модели помещается в видеопамять, остальное работает из оперативной памяти, а это медленнее. Бесплатно, в том числе для коммерческого использования. Скачать около 3,2 ГБ; на диске D: свободно 12 ГБ. Кнопка «Скачать и начать».",
      },
      {
        title: "Каждая модель говорит, как она будет работать",
        text: "Мы лучше скажем, что модель медленная, чем вы узнаете это после загрузки на 60 ГБ.",
        alt: "Модели, которые можно добавить, в настройках localSpace на английском, в разделе «Хорошо работает на этом компьютере»; у каждой — как она будет работать здесь, ещё до загрузки. Qwen3.5 4B от Alibaba (Qwen): около 15–20 слов в секунду, скачать около 3,2 ГБ. Qwen3.5 9B: около 5–7 слов в секунду, около 6,1 ГБ; ей нужна почти вся память компьютера, поэтому перед работой закройте другие программы, например браузер. Gemma 4 E2B от Google: около 15–20 слов в секунду, около 3,2 ГБ. Gemma 4 E4B: около 7–10 слов в секунду, около 4,8 ГБ. Все бесплатны, в том числе для коммерческого использования. Под списком: «Показать 2 модели, которые не поместятся».",
      },
      {
        title: "Потом вы пишете",
        text: "Ответы пишутся на вашем компьютере, и ваши разговоры хранятся там же.",
        alt: "Разговор в localSpace с Qwen3.5 4B на английском. Вопрос: что проверить перед покупкой подержанного велосипеда? Модель перечисляет семь проверок: пробная поездка (тормоза, передачи, управление), шины, рама (трещины и ржавчина), колёса и спицы, седло и подседельный штырь, цепь и переключатель, история велосипеда. И в конце: если что-то сломано или непонятно, узнайте цену ремонта, прежде чем платить полную стоимость.",
      },
    ],
    ways: {
      title: "Два способа запустить",
      own: {
        title: "На вашем компьютере",
        text: "Одно приложение на вашем собственном железе. Не нужно создавать учётную запись и ни во что входить.",
      },
      server: {
        title: "На сервере вашей компании",
        text: "Сотрудники открывают его в браузере и входят по рабочей почте. Модель работает на собственном сервере компании, поэтому ничего не уходит во внешний ИИ-сервис, а ноутбукам сотрудников видеокарта вообще не нужна.",
        note: "Серверы для компаний скоро появятся.",
        write: "Напишите нам: в нашей {telegram} или на {email}",
      },
    },
    telegram: "группе в Telegram",
    mailSubject: "localSpace для нашей компании",
    pending: "появится в день публикации",
    copy: "Копировать",
    copied: "Скопировано",
    labels: { file: "Файл", size: "Размер", mb: "МБ" },
    decimal: ",",
    files: {
      setup: {
        title: "Установщик",
        about: "Устанавливает localSpace и добавляет его в меню «Пуск».",
        button: "Скачать установщик",
      },
      portable: {
        title: "Портативный zip",
        about: "Ничего не устанавливается: распакуйте архив и запустите localSpace из папки.",
        button: "Скачать zip",
      },
    },
    dl: {
      title: "Скачать localSpace",
      lede: "Версия {version}, для Windows 10 или 11, 64-разрядной. Это предварительная версия, так что шероховатости будут.",
      counted: "Кнопки «Скачать» считают нажатия за день по каждому файлу и ничего не сохраняют о вас.",
      counterCode: "Код счётчика открыт.",
      checkTitle: "Проверьте загрузку",
      checkRun: "В PowerShell, в папке с файлом, выполните:",
      checkCompare: "Сравните результат с SHA-256 выше. Если значения различаются, не запускайте файл.",
      needsTitle: "Что нужно",
      needs: "Windows 10 или 11, 64-разрядная. Модели скачиваются отдельно, внутри приложения: несколько ГБ, подобранные под ваш компьютер.",
      measured:
        "Измерено: Qwen3.5 4B — около 6–7 токенов в секунду (ответы на английском) на ноутбуке с Core i7 и графикой Intel Iris Xe, без видеокарты NVIDIA, с 8 ГБ памяти, при открытых браузере и VS Code.",
      stopTitle: "Если Windows останавливает установщик",
      smartScreen:
        "Если Windows пишет «Система Windows защитила ваш компьютер», нажмите <strong>Подробнее</strong>, затем <strong>Выполнить в любом случае</strong>.",
      smartAppControl:
        "<strong>Если Windows не открывает установщик.</strong> На некоторых компьютерах включено интеллектуальное управление приложениями (Smart App Control), и оно может останавливать программы новых издателей. localSpace пока не подписан, поэтому так может случиться. Мы над этим работаем. Подлинность загрузки можно проверить по SHA-256 выше. Мы не советуем отключать интеллектуальное управление приложениями.",
      standsTitle: "Что уже есть",
      stands: [
        "Оно может отвечать про картинки, которые вы добавили в чат, если модель умеет их читать.",
        "Текстовые файлы и поиск в интернете оно пока не умеет.",
        "В очень длинном чате первое слово может появляться дольше.",
        "Телеметрии нет. Отключать нечего: её никто не писал.",
      ],
      communityTitle: "Расскажите, как всё прошло",
      community:
        "Что сработало, что сломалось и на каком компьютере — расскажите в нашей группе в Telegram. В приложении пункт Help → Send feedback открывает эту же группу.",
      communityButton: "Вступить в сообщество",
    },
  },

  uz: {
    langName: "UZ",
    title: "localSpace — kompyuteringiz oʻz sunʼiy intellektini ishga tushira oladi",
    description:
      "localSpace kompyuteringizni koʻrib chiqadi, unga mos modelni tavsiya qiladi va hech narsa yuklab olinmasdan oldin u qanchalik tez yozishini aytadi. Siz yozgan hamma narsa kompyuteringizda qoladi.",
    skip: "Asosiy qismga oʻtish",
    nav: {
      sections: "Boʻlimlar",
      footer: "Sahifa oxiri",
      language: "Til",
      how: "Qanday ishlaydi",
      companies: "Kompaniyalar uchun",
      download: "Yuklab olish",
      menu: "Menyu",
    },
    h1: ["Kompyuteringiz oʻz sunʼiy intellektini ishga tushira oladi.", "Qanchalik yaxshi ekanini biz aytamiz."],
    lede:
      "Hech narsa yuklab olinmasdan oldin ilova kompyuteringizga qaysi model mos kelishini va u soniyasiga nechta soʻz yozishini koʻrsatadi. Siz yozgan hamma narsa shu kompyuterda qoladi.",
    heroButton: "Windows uchun yuklab olish",
    versionWord: "Versiya",
    preview: "Sinov versiyasi",
    windows: "Windows 10 yoki 11, 64-bit",
    heroDetails: "Fayllar va SHA-256",
    demo: {
      label: "Bitta noutbukda:",
      gpu: "4 GB videokarta",
      rate: "soniyasiga {t} token · soniyasiga taxminan {w} soʻz",
      caption:
        "Javob yozilayotgandagi tezlik: localSpace 0.2.0-preview.1 dagi Qwen3.5 4B, 2026-yil 21-oktabrda NVIDIA GeForce RTX 3050 Ti (4 GB) va 16 GB xotirali noutbukda, Silent rejimida oʻlchangan. Savol va javob qanday yozilgan boʻlsa, shunday — ingliz tilida koʻrsatilgan. Ilova sizning tezligingizni hech narsa yuklab olinmasdan oldin aytadi.",
    },
    claimsTitle: "Nimaga ishonsangiz boʻladi",
    claims: [
      ["Hech narsa kompyuteringizdan chiqmaydi", "Ilova hech narsa yubormaydi: savollaringizni ham, javoblarini ham, undan qanchalik tez-tez foydalanishingizni ham."],
      ["Obuna yoʻq, xabar uchun toʻlov yoʻq", "U sizda allaqachon bor uskunada ishlaydi."],
      ["Internetsiz ham ishlaydi", "Model yuklab olingach, ulanish kerak emas."],
    ],
    steps: [
      {
        title: "Hech narsa yuklab olinmasdan oldin u kompyuteringizni koʻrib chiqadi",
        text: "Birinchi ekran: nima topgani, shu kompyuterga qaysi modelni tavsiya qilgani, u qanchalik tez yozishi va qancha yuklab olish kerakligi.",
        alt: "localSpace 0.2.0-preview.1 ning ingliz tilidagi birinchi ekrani. «Bu kompyuter» ostida: NVIDIA GeForce RTX 3050 Ti Laptop GPU, 4 GB videoxotira, 16 GB tizim xotirasi. Tavsiya etilgani: Qwen3.5 4B, yaxshi ishlaydi, siz oʻqishingizdan tezroq, soniyasiga taxminan 15–20 soʻz. Uning katta qismi videoxotiraga sigʻadi, qolgani sekinroq tizim xotirasidan ishlaydi. Bepul, tijoriy foydalanish uchun ham. Taxminan 3,2 GB yuklab olinadi; D: diskda 12 GB boʻsh. «Yuklab olish va boshlash» tugmasi.",
      },
      {
        title: "Har bir model qanday ishlashini aytadi",
        text: "60 GB yuklab olgandan keyin bilib qolishingizdan koʻra, sekin ekanini oldindan aytganimiz maʼqul.",
        alt: "localSpace sozlamalaridagi qoʻshish mumkin boʻlgan modellar (ingliz tilida), «Bu kompyuterda yaxshi ishlaydi» ostida; har birida yuklab olinmasdan oldin bu yerda qanday ishlashi yozilgan. Alibaba (Qwen) ning Qwen3.5 4B: soniyasiga taxminan 15–20 soʻz, taxminan 3,2 GB. Qwen3.5 9B: soniyasiga taxminan 5–7 soʻz, taxminan 6,1 GB; unga kompyuter xotirasining katta qismi kerak, shuning uchun undan oldin brauzer kabi boshqa dasturlarni yoping. Google ning Gemma 4 E2B: soniyasiga taxminan 15–20 soʻz, taxminan 3,2 GB. Gemma 4 E4B: soniyasiga taxminan 7–10 soʻz, taxminan 4,8 GB. Hammasi bepul, tijoriy foydalanish uchun ham. Roʻyxat ostida: «Sigʻmaydigan 2 ta modelni koʻrsatish».",
      },
      {
        title: "Keyin siz yozasiz",
        text: "Javoblar kompyuteringizda yoziladi, suhbatlaringiz ham oʻsha yerda saqlanadi.",
        alt: "localSpace’dagi Qwen3.5 4B bilan ingliz tilidagi suhbat. Savol: ishlatilgan velosiped sotib olishdan oldin nimani tekshirish kerak? Model yettita tekshiruvni sanaydi: sinov yurishi (tormoz, tezliklar, boshqaruv), shinalar, rama (yoriq va zang), gʻildirak va kegaylar, oʻrindiq va uning ustuni, zanjir va tezlik almashtirgich, velosiped tarixi. Oxirida: biror narsa buzilgan yoki tushunarsiz boʻlsa, toʻliq narx toʻlashdan oldin taʼmirlash narxini soʻrang.",
      },
    ],
    ways: {
      title: "Ishga tushirishning ikki yoʻli",
      own: {
        title: "Oʻz kompyuteringizda",
        text: "Oʻz uskunangizda bitta ilova. Hisob ochish ham, biror joyga kirish ham kerak emas.",
      },
      server: {
        title: "Kompaniyangiz serverida",
        text: "Xodimlar uni brauzerda ochib, ish pochtasi bilan kiradi. Model kompaniyaning oʻz serverida ishlaydi, shuning uchun hech narsa tashqi sunʼiy intellekt xizmatiga ketmaydi, xodimlarning noutbuklariga esa videokarta umuman kerak emas.",
        note: "Kompaniyalar uchun serverlar tez orada.",
        write: "Bizga yozing: {telegram} yoki {email}",
      },
    },
    telegram: "Telegram guruhimizda",
    mailSubject: "Kompaniyamiz uchun localSpace",
    pending: "eʼlon qilingan kuni beriladi",
    copy: "Nusxalash",
    copied: "Nusxalandi",
    labels: { file: "Fayl", size: "Hajmi", mb: "MB" },
    decimal: ",",
    files: {
      setup: {
        title: "Oʻrnatuvchi",
        about: "localSpace’ni oʻrnatadi va «Pusk» menyusiga qoʻshadi.",
        button: "Oʻrnatuvchini yuklab olish",
      },
      portable: {
        title: "Koʻchma zip",
        about: "Hech narsa oʻrnatilmaydi: arxivni oching va localSpace’ni papkadan ishga tushiring.",
        button: "Zip’ni yuklab olish",
      },
    },
    dl: {
      title: "localSpace’ni yuklab olish",
      lede: "Versiya {version}, Windows 10 yoki 11, 64-bit uchun. Bu sinov versiyasi, shuning uchun kamchiliklar boʻladi.",
      counted: "«Yuklab olish» tugmalari har bir fayl boʻyicha kunlik bosishlarni sanaydi va siz haqingizda hech narsa saqlamaydi.",
      counterCode: "Hisoblagich kodi ochiq.",
      checkTitle: "Yuklab olingan faylni tekshiring",
      checkRun: "PowerShell’da, fayl turgan papkada quyidagini bajaring:",
      checkCompare: "Natijani yuqoridagi SHA-256 bilan solishtiring. Agar ikki qiymat farq qilsa, faylni ishga tushirmang.",
      needsTitle: "Nima kerak",
      needs: "Windows 10 yoki 11, 64-bit. Modellar ilova ichida alohida yuklab olinadi: bir necha GB, kompyuteringizga qarab tanlanadi.",
      measured:
        "Oʻlchangan: Qwen3.5 4B — soniyasiga taxminan 6–7 token (ingliz tilidagi javoblar), Core i7 va Intel Iris Xe grafikali, NVIDIA videokartasiz, 8 GB xotirali noutbukda, brauzer va VS Code ochiq holda.",
      stopTitle: "Agar Windows oʻrnatuvchini toʻxtatsa",
      smartScreen:
        "Agar Windows «Windows protected your PC» (rus tilidagi Windowsda «Система Windows защитила ваш компьютер») desa, <strong>More info</strong> (<strong>Подробнее</strong>), keyin <strong>Run anyway</strong> (<strong>Выполнить в любом случае</strong>) tugmasini bosing.",
      smartAppControl:
        "<strong>Agar Windows oʻrnatuvchini ochmasa.</strong> Baʼzi kompyuterlarda Smart App Control yoqilgan boʻladi va u yangi nashriyotchilarning dasturlarini toʻxtatishi mumkin. localSpace hali imzolanmagan, shuning uchun shunday boʻlishi mumkin. Biz bu ustida ishlayapmiz. Yuklab olingan fayl haqiqiyligini yuqoridagi SHA-256 orqali tekshirishingiz mumkin. Smart App Control’ni oʻchirishni tavsiya qilmaymiz.",
      standsTitle: "Hozir nima bor",
      stands: [
        "Chatga qoʻshgan rasmlaringiz haqida javob bera oladi, agar model rasmlarni oʻqiy olsa.",
        "Matnli fayllarni oʻqish va internetda qidirish hali yoʻq.",
        "Juda uzun chatda birinchi soʻz chiqishi uzoqroq vaqt olishi mumkin.",
        "Telemetriya yoʻq. Oʻchiradigan narsa ham yoʻq, chunki u yozilmagan.",
      ],
      communityTitle: "Qanday oʻtganini aytib bering",
      community:
        "Nima ishladi, nima buzildi va qaysi kompyuterda — Telegram guruhimizda aytib bering. Ilovada Help → Send feedback bandi xuddi shu guruhni ochadi.",
      communityButton: "Hamjamiyatimizga qoʻshiling",
    },
  },
};
