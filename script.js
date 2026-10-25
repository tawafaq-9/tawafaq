/* ==========================================================
   تَوافق - ملف البرمجة والمنطق الأساسي (script.js - النسخة النهائية بالأيقونات الاحترافية)
   ========================================================== */

// --- 1. بنك الأسئلة الاحترافي مع مفاتيح الأيقونات ---
var defaultQuestionsBank = [
    {
        id: 1,
        question: "ما هو النشاط المفضل للأوقات المشتركة؟",
        options: ["مشاهدة أفلام ومسلسلات 🎬", "ألعاب وتحديات 🎮", "سهر ومشاوير 🌙", "أكل وطبخ 🍕"],
        iconKeys: ["movie", "gamepad", "moon", "pizza"]
    },
    {
        id: 2,
        question: "إذا صار سوء فهم، كيف يتصرف غالباً؟",
        options: ["يحاور بهدوء 💬", "ينسحب ويهدأ أولاً 🧘", "يزعل بسرعة 😅", "يغير الموضوع دغري 🔀"],
        iconKeys: ["chat", "meditation", "face", "shuffle"]
    },
    {
        id: 3,
        question: "ما هي الميزة الأبرز في شخصيته؟",
        options: ["الوفاء والصدق 🤝", "خفة الدم والضحك 😂", "الذكاء والحكمة 🧠", "الهدوء والطيبة 🌸"],
        iconKeys: ["handshake", "laugh", "brain", "flower"]
    },
    {
        id: 4,
        question: "كيف يعبر عن اهتمامه وتوافق ودّه؟",
        options: ["بالأفعال والوقفة 🛡️", "بالكلام الطيب 💌", "بالهدايا والمفاجآت 🎁", "بالمساعدة اليومية 🛠️"],
        iconKeys: ["shield", "envelope", "gift", "tools"]
    },
    {
        id: 5,
        question: "ما هو المشروب الأساسي اليومي؟",
        options: ["قهوة سادة / تركية ☕", "شاي 🍵", "عصائر ومشروبات باردة 🥤", "متة 🧉"],
        iconKeys: ["coffee", "tea", "cup", "mate"]
    },
    {
        id: 6,
        question: "طريقته المفضلة للترويق واستعادة الطاقة؟",
        options: ["النوم والاسترخاء 😴", "الاستماع للموسيقى 🎧", "الخروج للطبيعة 🌿", "الأكل والحلويات 🎂"],
        iconKeys: ["sleep", "headphones", "nature", "cake"]
    },
    {
        id: 7,
        question: "صفة لا يتحملها في الأشخاص؟",
        options: ["الكذب والنفاق 🤥", "البخل 💰", "التصنع والتكبر 👑", "النكد والشكوى 🤦"],
        iconKeys: ["lie", "money", "crown", "annoyed"]
    },
    {
        id: 8,
        question: "كيف يخطط للرحلات والمشاريع؟",
        options: ["يخطط بكل التفاصيل 📋", "عفوية وارتجال 🎲", "حسب المزاج والجو ⛅", "يترك التخطيط لغيره 🙋"],
        iconKeys: ["plan", "dice", "weather", "relax"]
    },
    {
        id: 9,
        question: "ما نوع الهدية الأقرب لقلبه؟",
        options: ["شيء يحتاجه فعلياً 📦", "هدية معنوية تذكارية 💖", "ساعة أو اكسسوار ⌚", "عزومة على وجبة ممتازة 🍔"],
        iconKeys: ["box", "heart", "watch", "burger"]
    },
    {
        id: 10,
        question: "ردة فعله في المواقف المفاجئة؟",
        options: ["سرعة تصرف وبديهة ⚡", "تفكير وتريث 🔍", "توتر ومحاولة سيطرة 🌀", "مرونة وضحك 😃"],
        iconKeys: ["flash", "search", "stress", "smile"]
    },
    {
        id: 11,
        question: "كيف يقضي سهراته غالباً؟",
        options: ["قعدة بيتية هادئة 🛋️", "طلعة مع الشلة والأصدقاء 🚗", "تصفح وموبايل وسوشيال ميديا 📱", "ألعاب إلكترونية وبلايستيشن 🎮"],
        iconKeys: ["sofa", "car", "phone", "controller"]
    },
    {
        id: 12,
        question: "ما هي طريقته في اتخاذ القرارات المهمة؟",
        options: ["دراسة كل التفاصيل بعقلانية 🧠", "حسب الإحساس والحدس ❤️", "استشارة المقربين أولاً 👥", "على البركة وبدون تردد 🎲"],
        iconKeys: ["mind", "emotion", "group", "luck"]
    },
    {
        id: 13,
        question: "ما هو الفصل الأفضل بالنسبة له؟",
        options: ["الشتاء والمطر 🌧️", "الصيف والبحر 🏖️", "الربيع والطبيعة 🌷", "الخريف والجو الرايق 🍂"],
        iconKeys: ["rain", "beach", "spring", "autumn"]
    },
    {
        id: 14,
        question: "كيف يتعامل مع ضغط الشغل أو الدراسة؟",
        options: ["يتحمل بصبر لآخر لحظة 🦾", "يفصل ويعمل استراحة دغري ☕", "يتوتر ويبتسم بصعوبة 😅", "ينظم وقته بدقة متناهية 📅"],
        iconKeys: ["strength", "break", "smile", "calendar"]
    },
    {
        id: 15,
        question: "أكثر مكان يحب يروح له بالسفر أو التنزه؟",
        options: ["الطبيعة والجبال 🌲", "المدينة الصاخبة والأسواق 🏙️", "البحر والساحل 🌊", "البيت والراحة الاستثنائية 🛏️"],
        iconKeys: ["forest", "city", "ocean", "bed"]
    },
    {
        id: 16,
        question: "شو أكتر أكلة بحبها عالغداء؟",
        options: ["مشاوي ولحوم 🥩", "أكلات منسف أو طبخ عربي 🍲", "وجبات سريعة وبيرجر 🍔", "معجنات ومأكولات خفيفة 🥧"],
        iconKeys: ["meat", "soup", "fastfood", "pie"]
    },
    {
        id: 17,
        question: "شو ردة فعله لما حدا يتأخر عليه بموعد؟",
        options: ["يعذر الطرف الآخر ويتفهم 🤝", "يزعل ويعصب بصمت 🔕", "يبادلها بتأخير مماثل بالحملة القادمة ⏱️", "يطول باله للآخر بس بيعاتب بلطف 💬"],
        iconKeys: ["forgive", "quiet", "timer", "talk"]
    },
    {
        id: 18,
        question: "كيف يقضي يوم العطلة والراحة؟",
        options: ["نوم طويل وتعويض ساعات السهر 🛌", "ترتيب البيت وتعديل الغرض 🧹", "طلعة ومشوار طويل 🚗", "قعدة قهوة مع كتاب أو مسلسل 📖"],
        iconKeys: ["sleep", "clean", "trip", "book"]
    },
    {
        id: 19,
        question: "ما هي لغة الحب أو التعبير الأقرب له؟",
        options: ["الكلمات الطيبة والمديح 💌", "الأفعال والخدمات المساندة 🛠️", "الوقت النوعي والمشاركة ⏳", "اللمسات والهدايا الرمزية 🎁"],
        iconKeys: ["letter", "service", "time", "present"]
    },
    {
        id: 20,
        question: "شو طابعه الغالب أول ما يصحى من النوم؟",
        options: ["رايق وببتسم للكل ☀️", "صامت وما بحب حدا يحكيه لحد ما يشرب قهوتو ☕", "دايخ وبده ربع ساعة ليعي تماماً 🥴", "نشيط وببلش يومه بسرعة ⚡"],
        iconKeys: ["sun", "coffee", "dizzy", "energy"]
    }
];

// --- 2. حالة التطبيق (State) ---
var quizState = {
    creatorName: "",
    gender: "female",
    age: 20,
    relation: "friend",
    count: 10,
    theme: "cute",
    isPrivate: false,
    questions: [],
    creatorAnswers: {}, 
    takerName: "",
    takerAnswers: {},   
    currentPlayIndex: 0
};

// --- 3. تهيئة عناصر الصفحة ---
document.addEventListener("DOMContentLoaded", () => {
    initUIEvents();
    checkURLParameters();
});

// --- 4. إدارة الفعاليات والأزرار ---
function initUIEvents() {
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            const group = this.getAttribute('data-group');
            document.querySelectorAll(`.option-card[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            const val = this.getAttribute('data-value');
            if (group === 'gender') quizState.gender = val;
            if (group === 'relation') quizState.relation = val;
            if (group === 'count') quizState.count = parseInt(val);

            autoUpdateTheme();
        });
    });

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (document.body.classList.contains('theme-cute')) {
                document.body.classList.remove('theme-cute');
                document.body.classList.add('theme-youth');
            } else {
                document.body.classList.remove('theme-youth');
                document.body.classList.add('theme-cute');
            }
        });
    }

    const toQuestionsBtn = document.getElementById('to-questions-btn');
    if (toQuestionsBtn) {
        toQuestionsBtn.addEventListener('click', goToQuestionsBuilder);
    }

    const generateBtn = document.getElementById('generate-quiz-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateQuizDashboard);
    }

    const copyBtn = document.getElementById('copy-link-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyShareLink);
    }

    const startPlayBtn = document.getElementById('start-test-play-btn');
    if (startPlayBtn) {
        startPlayBtn.addEventListener('click', startQuizPlay);
    }

    const nextPlayBtn = document.getElementById('next-play-q-btn');
    if (nextPlayBtn) {
        nextPlayBtn.addEventListener('click', handleNextPlayQuestion);
    }

    const retestBtn = document.getElementById('re-test-btn');
    if (retestBtn) {
        retestBtn.addEventListener('click', () => window.location.reload());
    }

    const makeBtn = document.getElementById('make-my-own-quiz-btn');
    if (makeBtn) {
        makeBtn.addEventListener('click', () => {
            window.location.href = window.location.origin + window.location.pathname;
        });
    }
}

function autoUpdateTheme() {
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect && themeSelect.value !== 'auto') {
        quizState.theme = themeSelect.value;
    } else {
        quizState.theme = (quizState.gender === 'female') ? 'cute' : 'youth';
    }
    document.body.className = `theme-${quizState.theme}`;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');
}

// ربط كل مفتاح بأيقونة FontAwesome احترافية ومضمونة 100%
function getProIconClass(key) {
    const iconsMap = {
        "movie": "fa-film", "gamepad": "fa-gamepad", "moon": "fa-moon", "pizza": "fa-pizza-slice",
        "chat": "fa-comments", "meditation": "fa-spa", "face": "fa-face-smile", "shuffle": "fa-shuffle",
        "handshake": "fa-handshake", "laugh": "fa-face-laugh", "brain": "fa-brain", "flower": "fa-seedling",
        "shield": "fa-shield-halved", "envelope": "fa-envelope-open-text", "gift": "fa-gift", "tools": "fa-screwdriver-wrench",
        "coffee": "fa-mug-hot", "tea": "fa-mug-saucer", "cup": "fa-glass-water", "mate": "fa-leaf",
        "sleep": "fa-bed", "headphones": "fa-headphones", "nature": "fa-tree", "cake": "fa-cake-candles",
        "lie": "fa-face-rolling-eyes", "money": "fa-wallet", "crown": "fa-crown", "annoyed": "fa-face-angry",
        "plan": "fa-clipboard-list", "dice": "fa-dice", "weather": "fa-cloud-sun", "relax": "fa-couch",
        "box": "fa-box-open", "heart": "fa-heart", "watch": "fa-clock", "burger": "fa-burger",
        "flash": "fa-bolt", "search": "fa-magnifying-glass", "stress": "fa-triangle-exclamation", "smile": "fa-face-smile-beam",
        "sofa": "fa-couch", "car": "fa-car", "phone": "fa-mobile-screen", "controller": "fa-gamepad",
        "mind": "fa-lightbulb", "emotion": "fa-heart", "group": "fa-users", "luck": "fa-clover",
        "rain": "fa-cloud-rain", "beach": "fa-umbrella-beach", "spring": "fa-spa", "autumn": "fa-wind",
        "strength": "fa-dumbbell", "break": "fa-mug-hot", "calendar": "fa-calendar-days",
        "forest": "fa-tree", "city": "fa-city", "ocean": "fa-water", "bed": "fa-bed",
        "meat": "fa-drumstick-bite", "soup": "fa-bowl-food", "fastfood": "fa-burger", "pie": "fa-pie",
        "forgive": "fa-hands-clapping", "quiet": "fa-face-zipper", "timer": "fa-stopwatch", "talk": "fa-comments",
        "clean": "fa-broom", "trip": "fa-suitcase-rolling", "book": "fa-book-open",
        "letter": "fa-envelope", "service": "fa-hands-holding-child", "time": "fa-hourglass-half", "present": "fa-gift",
        "sun": "fa-sun", "dizzy": "fa-face-dizzy", "energy": "fa-bolt-lightning"
    };
    return iconsMap[key] || "fa-star";
}

// --- 5. خطوة تخصيص الأسئلة واختيار العدد ---
function goToQuestionsBuilder() {
    const nameInput = document.getElementById('creator-name');
    if (nameInput && !nameInput.value.trim()) {
        alert("يرجى كتابة اسمك أولاً بمربع الاسم!");
        return;
    }

    quizState.creatorName = nameInput.value.trim();
    quizState.age = parseInt(document.getElementById('creator-age').value) || 20;
    quizState.isPrivate = document.getElementById('privacy-toggle').checked;

    let selectedCount = quizState.count;
    let shuffled = [...defaultQuestionsBank].sort(() => 0.5 - Math.random());
    quizState.questions = JSON.parse(JSON.stringify(shuffled.slice(0, selectedCount)));

    renderQuestionsForCreator();
    showScreen('screen-questions-builder');
}

function renderQuestionsForCreator() {
    const container = document.getElementById('questions-list-container');
    container.innerHTML = '';

    const addQBox = document.createElement('div');
    addQBox.className = 'input-card';
    addQBox.style.background = 'rgba(108, 92, 231, 0.05)';
    addQBox.innerHTML = `
        <label class="input-label"><i class="fa-solid fa-plus-circle"></i> أضف سؤالاً جديداً من عندك</label>
        <div style="display: flex; gap: 8px; margin-bottom: 10px;">
            <input type="text" id="new-custom-question-text" class="text-input" placeholder="اكتب نص السؤال هنا...">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
            <input type="text" id="new-q-opt-0" class="text-input" placeholder="الخيار الأول">
            <input type="text" id="new-q-opt-1" class="text-input" placeholder="الخيار الثاني">
            <input type="text" id="new-q-opt-2" class="text-input" placeholder="الخيار الثالث">
            <input type="text" id="new-q-opt-3" class="text-input" placeholder="الخيار الرابع">
        </div>
        <button type="button" id="submit-new-question-btn" class="main-action-btn" style="padding: 10px; font-size: 0.9rem;">إضافة السؤال إلى الاختبار</button>
    `;
    container.appendChild(addQBox);

    setTimeout(() => {
        const subNewBtn = document.getElementById('submit-new-question-btn');
        if (subNewBtn) {
            subNewBtn.onclick = addNewCustomQuestionToQuiz;
        }
    }, 100);

    quizState.questions.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = 'input-card';
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <label class="input-label" style="margin-bottom: 0;">${index + 1}. ${q.question}</label>
                <button type="button" class="icon-btn delete-q-btn" data-qid="${q.id}" title="حذف السؤال" style="width: 30px; height: 30px; font-size: 0.8rem; background: #ff4757; color: white;"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="cards-grid relation-grid" id="q-options-${q.id}">
                ${q.options.map((opt, optIdx) => `
                    <div class="select-card creator-opt ${quizState.creatorAnswers[q.id] === optIdx ? 'active' : ''}" data-qid="${q.id}" data-opt="${optIdx}">
                        <div class="icon-3d-wrapper" style="width: 50px; height: 50px; margin: 0 auto 8px auto; background: rgba(108, 92, 231, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                            <i class="fa-solid ${getProIconClass(q.iconKeys ? q.iconKeys[optIdx] : '')}" style="font-size: 1.3rem; color: var(--primary-color);"></i>
                        </div>
                        <div class="card-title">${opt}</div>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top: 12px; display: flex; gap: 8px;">
                <input type="text" class="text-input custom-option-input" id="custom-input-${q.id}" placeholder="أو أضف إجابة أخرى...">
                <button type="button" class="sub-btn add-custom-opt-btn" data-qid="${q.id}" style="white-space: nowrap; padding: 0 15px;">إضافة الخيار</button>
            </div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll('.creator-opt').forEach(optCard => {
        optCard.addEventListener('click', function() {
            const qid = parseInt(this.getAttribute('data-qid'));
            const optIdx = parseInt(this.getAttribute('data-opt'));

            document.querySelectorAll(`.creator-opt[data-qid="${qid}"]`).forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            quizState.creatorAnswers[qid] = optIdx;
        });
    });

    document.querySelectorAll('.add-custom-opt-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const qid = parseInt(this.getAttribute('data-qid'));
            const inputField = document.getElementById(`custom-input-${qid}`);
            const customText = inputField.value.trim();

            if (!customText) {
                alert("الرجاء كتابة نص الإجابة الأخرى أولاً!");
                return;
            }

            const targetQuestion = quizState.questions.find(item => item.id === qid);
            if (targetQuestion) {
                targetQuestion.options.push(customText);
                if(!targetQuestion.iconKeys) targetQuestion.iconKeys = [];
                targetQuestion.iconKeys.push("star");
                const newOptIndex = targetQuestion.options.length - 1;
                quizState.creatorAnswers[qid] = newOptIndex;
                renderQuestionsForCreator();
            }
        });
    });

    document.querySelectorAll('.delete-q-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const qid = parseInt(this.getAttribute('data-qid'));
            quizState.questions = quizState.questions.filter(item => item.id !== qid);
            delete quizState.creatorAnswers[qid];
            renderQuestionsForCreator();
        });
    });
}

function addNewCustomQuestionToQuiz() {
    const qText = document.getElementById('new-custom-question-text').value.trim();
    const opt0 = document.getElementById('new-q-opt-0').value.trim();
    const opt1 = document.getElementById('new-q-opt-1').value.trim();
    const opt2 = document.getElementById('new-q-opt-2').value.trim();
    const opt3 = document.getElementById('new-q-opt-3').value.trim();

    if (!qText) {
        alert("الرجاء كتابة نص السؤال الجديد!");
        return;
    }

    let userOpts = [opt0, opt1, opt2, opt3].filter(o => o !== "");
    if (userOpts.length < 2) {
        alert("الرجاء إدخال خيارين على الأقل للسؤال الجديد!");
        return;
    }

    const newQuestionObj = {
        id: Date.now(),
        question: qText,
        options: userOpts,
        iconKeys: ["gift", "star", "fire", "trophy"]
    };

    quizState.questions.push(newQuestionObj);
    quizState.creatorAnswers[newQuestionObj.id] = 0;
    renderQuestionsForCreator();
}

// --- 6. توليد رابط المشاركة ---
function generateQuizDashboard() {
    if (quizState.questions.length === 0) {
        alert("يجب أن يحتوي الاختبار على سؤال واحد على الأقل!");
        return;
    }
    if (Object.keys(quizState.creatorAnswers).length < quizState.questions.length) {
        alert("يرجى تحديد الإجابة الصحيحة لكل الأسئلة قبل المتابعة!");
        return;
    }

    const payload = btoa(encodeURIComponent(JSON.stringify({
        cName: quizState.creatorName,
        theme: quizState.theme,
        ans: quizState.creatorAnswers,
        qs: quizState.questions
    })));

    const shareUrl = `${window.location.origin}${window.location.pathname}?quiz=${payload}`;
    document.getElementById('shareable-link-input').value = shareUrl;

    document.getElementById('share-whatsapp-btn').onclick = () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('اختبر مدى توافقك ومعرفتك بي عبر لعبة "تَوافق": ' + shareUrl)}`);
    };
    document.getElementById('share-telegram-btn').onclick = () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('اختبار التوافق العجيب!')}`);
    };

    showScreen('screen-dashboard');
}

function copyShareLink() {
    const input = document.getElementById('shareable-link-input');
    input.select();
    document.execCommand('copy');
    alert("تم نسخ رابط الاختبار بنجاح!");
}

// --- 7. فحص الرابط ومعالجة المشارك ---
function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const quizDataParam = urlParams.get('quiz');

    if (quizDataParam) {
        try {
            const decoded = JSON.parse(decodeURIComponent(atob(quizDataParam)));
            