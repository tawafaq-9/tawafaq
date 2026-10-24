
"use strict";

/* ==========================================
   تَوافق — Interactive Quiz Application
   File: script.js
   Version: 1.0
========================================== */

(() => {
    /* ==========================================
       1. الثوابت والتخزين
    ========================================== */

    const STORAGE = {
        tests: "tawafuq_tests_v1",
        activeTest: "tawafuq_active_test_v1",
        results: "tawafuq_results_v1",
        draft: "tawafuq_draft_v1"
    };

    const MIN_QUESTIONS = 1;
    const MAX_QUESTIONS = 20;
    const MIN_ANSWERS = 2;
    const MAX_ANSWERS = 8;
    const MAX_IMAGE_SIZE = 700 * 1024;
    const MAX_SHARE_LENGTH = 150000;

    const $ = (selector, root = document) =>
        root.querySelector(selector);

    const $$ = (selector, root = document) =>
        Array.from(root.querySelectorAll(selector));

    const screens = $$(".screen");

    const state = {
        profile: {
            gender: "male",
            age: 18,
            relationship: "friend",
            questionCount: 10
        },

        test: null,
        questions: [],
        results: [],

        currentQuestionIndex: 0,
        selectedAnswerId: null,
        answers: [],

        participantName: "",
        isPreview: false,
        returnToDashboard: false
    };

    /* ==========================================
       2. أدوات مساعدة
    ========================================== */

    function createId() {
        if (crypto.randomUUID) {
            return crypto.randomUUID();
        }

        return (
            Date.now().toString(36) +
            Math.random().toString(36).slice(2, 12)
        );
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(
            /[&<>"']/g,
            character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[character]
        );
    }

    function safeParseJSON(value, fallback) {
        try {
            return value ? JSON.parse(value) : fallback;
        } catch {
            return fallback;
        }
    }

    function readStorage(key, fallback = []) {
        try {
            return safeParseJSON(
                localStorage.getItem(key),
                fallback
            );
        } catch {
            return fallback;
        }
    }

    function writeStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error("تعذّر حفظ البيانات:", error);
            showToast(
                "تعذّر الحفظ. قد تكون مساحة التخزين ممتلئة.",
                "error"
            );
            return false;
        }
    }

    function removeStorage(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn("تعذّر حذف البيانات:", error);
        }
    }

    function normalizeName(value) {
        return String(value ?? "")
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 40);
    }

    function getRelationshipLabel(value) {
        const labels = {
            sibling: "أخ / أخت",
            friend: "صديق / صديقة",
            lover: "حبيب / حبيبة",
            spouse: "زوج / زوجة"
        };

        return labels[value] || labels.friend;
    }

    function formatDate(value) {
        try {
            return new Date(value).toLocaleDateString("ar", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });
        } catch {
            return "";
        }
    }

    function shuffleArray(items) {
        const array = [...items];

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    /* ==========================================
       3. التنقل بين الشاشات
    ========================================== */

    function showScreen(screenId) {
        screens.forEach(screen => {
            const isActive = screen.id === screenId;

            screen.hidden = !isActive;
            screen.classList.toggle("active", isActive);
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function showToast(message, type = "info") {
        const container = $("#toast-container");

        if (!container) {
            return;
        }

        const toast = document.createElement("div");

        toast.className = `toast ${type}`;
        toast.setAttribute("role", "status");
        toast.textContent = message;

        container.appendChild(toast);

        window.setTimeout(() => {
            toast.classList.add("removing");

            window.setTimeout(() => toast.remove(), 280);
        }, 3200);
    }

    function openDialog({
        title = "هل أنت متأكد؟",
        message = "",
        icon = "💭",
        confirmText = "تأكيد",
        cancelText = "إلغاء"
    } = {}) {
        const dialog = $("#confirm-dialog");

        if (!dialog) {
            return Promise.resolve(false);
        }

        $("#confirm-dialog-title").textContent = title;
        $("#confirm-dialog-message").textContent = message;
        $("#confirm-dialog-icon").textContent = icon;
        $("#dialog-confirm-btn").textContent = confirmText;
        $("#dialog-cancel-btn").textContent = cancelText;

        return new Promise(resolve => {
            const finish = value => {
                dialog.removeEventListener("close", onClose);

                if (dialog.open) {
                    dialog.close();
                }

                resolve(value);
            };

            const onClose = () => {
                resolve(false);
            };

            dialog.addEventListener("close", onClose, {
                once: true
            });

            $("#dialog-confirm-btn").onclick = () => finish(true);
            $("#dialog-cancel-btn").onclick = () => finish(false);

            if (typeof dialog.showModal === "function") {
                dialog.showModal();
            } else {
                finish(
                    window.confirm(message || title)
                );
            }
        });
    }

    /* ==========================================
       4. الثيم
    ========================================== */

    function applyTheme(profile = state.profile) {
        document.body.classList.remove(
            "theme-male",
            "theme-female",
            "age-young",
            "age-mature"
        );

        document.body.classList.add(
            profile.gender === "female"
                ? "theme-female"
                : "theme-male"
        );

        document.body.classList.add(
            Number(profile.age) <= 25
                ? "age-young"
                : "age-mature"
        );
    }

    /* ==========================================
       5. إعداد نموذج المنشئ
    ========================================== */

    function readCreatorProfile(form) {
        const data = new FormData(form);

        const gender = data.get("gender");
        const age = Number(data.get("age"));
        const relationship = data.get("relationship");
        const questionCount = Number(data.get("questionCount"));

        if (!["male", "female"].includes(gender)) {
            showToast("اختر الجنس أولاً.", "error");
            return null;
        }

        if (!Number.isInteger(age) || age < 13 || age > 120) {
            showToast("أدخل عمراً صحيحاً بين 13 و120 سنة.", "error");
            return null;
        }

        if (
            !["sibling", "friend", "lover", "spouse"]
                .includes(relationship)
        ) {
            showToast("اختر نوع العلاقة.", "error");
            return null;
        }

        if (![10, 15, 20].includes(questionCount)) {
            showToast("اختر عدد الأسئلة.", "error");
            return null;
        }

        return {
            gender,
            age,
            relationship,
            questionCount
        };
    }

    function makeEmptyQuestion(index) {
        return {
            id: createId(),
            text: "",
            image: "",
            allowOther: false,

            answers: [
                {
                    id: createId(),
                    text: "",
                    image: "",
                    correct: true
                },
                {
                    id: createId(),
                    text: "",
                    image: "",
                    correct: false
                }
            ]
        };
    }

    function startQuestionCreation() {
        state.questions = Array.from(
            { length: state.profile.questionCount },
            (_, index) => makeEmptyQuestion(index)
        );

        renderQuestionEditor();

        showScreen("questions-screen");
    }

    /* ==========================================
       6. محرر الأسئلة
    ========================================== */

    function renderQuestionEditor() {
        const list = $("#question-editor-list");
        const template = $("#question-editor-template");

        if (!list || !template) {
            return;
        }

        list.replaceChildren();

        $("#question-total").textContent = state.questions.length;

        state.questions.forEach((question, index) => {
            const fragment = template.content.cloneNode(true);
            const card = $(".question-editor-card", fragment);

            card.dataset.questionId = question.id;

            $(".question-number", card).textContent = index + 1;

            $(".question-text-input", card).value = question.text;

            $(".allow-other-answer", card).checked =
                question.allowOther;

            const imagePreview = $(".question-image-preview", card);

            if (question.image) {
                imagePreview.src = question.image;
                imagePreview.hidden = false;
            }

            question.answers.forEach(answer => {
                appendAnswerOption(
                    card,
                    question,
                    answer
                );
            });

            updateQuestionCardStatus(card, question);

            list.appendChild(fragment);
        });

        updateQuestionProgress();
    }

    function appendAnswerOption(card, question, answer) {
        const template = $("#answer-option-template");

        if (!template) {
            return;
        }

        const fragment = template.content.cloneNode(true);
        const row = $(".answer-option-row", fragment);

        row.dataset.answerId = answer.id;

        const radio = $(".correct-answer-input", row);

        radio.name = `correct-${question.id}`;
        radio.checked = Boolean(answer.correct);

        $(".answer-text-input", row).value = answer.text;

        const preview = $(".answer-image-preview", row);

        if (answer.image) {
            preview.src = answer.image;
            preview.hidden = false;
        }

        $(".answer-options-list", card).appendChild(fragment);
    }

    function updateQuestionCardStatus(card, question) {
        const status = $(".question-status", card);

        if (!status) {
            return;
        }

        const complete =
            Boolean(question.text.trim()) &&
            question.answers.length >= MIN_ANSWERS &&
            question.answers.every(answer => answer.text.trim()) &&
            question.answers.some(answer => answer.correct);

        status.textContent = complete
            ? "✓ مكتمل"
            : "سؤال غير مكتمل";

        status.style.color = complete
            ? "var(--success)"
            : "var(--text-secondary)";
    }

    function updateQuestionProgress() {
        const total = state.questions.length;

        const completed = state.questions.filter(question => {
            return (
                question.text.trim() &&
                question.answers.length >= MIN_ANSWERS &&
                question.answers.every(answer => answer.text.trim()) &&
                question.answers.some(answer => answer.correct)
            );
        }).length;

        $("#question-total").textContent = total;
        $("#question-completed").textContent = completed;

        const progress = total ? (completed / total) * 100 : 0;

        $("#question-progress-bar").style.width = `${progress}%`;

        $("#question-progress").setAttribute(
            "aria-valuemax",
            String(total)
        );

        $("#question-progress").setAttribute(
            "aria-valuenow",
            String(completed)
        );
    }

    function syncQuestionFromCard(card) {
        const question = state.questions.find(
            item => item.id === card.dataset.questionId
        );

        if (!question) {
            return;
        }

        question.text = $(".question-text-input", card).value;

        question.allowOther =
            $(".allow-other-answer", card).checked;

        question.answers = $$(".answer-option-row", card).map(row => ({
            id: row.dataset.answerId,

            text: $(".answer-text-input", row).value.trim(),

            image: question.answers.find(
                answer => answer.id === row.dataset.answerId
            )?.image || "",

            correct: $(".correct-answer-input", row).checked
        }));

        updateQuestionCardStatus(card, question);
        updateQuestionProgress();
    }

    function addAnswerToQuestion(card) {
        const question = state.questions.find(
            item => item.id === card.dataset.questionId
        );

        if (!question) {
            return;
        }

        if (question.answers.length >= MAX_ANSWERS) {
            showToast(
                `الحد الأقصى هو ${MAX_ANSWERS} خيارات لكل سؤال.`,
                "error"
            );
            return;
        }

        syncQuestionFromCard(card);

        question.answers.push({
            id: createId(),
            text: "",
            image: "",
            correct: false
        });

        renderQuestionEditor();
    }

    async function removeAnswerFromQuestion(card, row) {
        const question = state.questions.find(
            item => item.id === card.dataset.questionId
        );

        if (!question) {
            return;
        }

        if (question.answers.length <= MIN_ANSWERS) {
            showToast("يجب أن يحتوي السؤال على خيارين على الأقل.", "error");
            return;
        }

        const answerId = row.dataset.answerId;

        syncQuestionFromCard(card);

        question.answers = question.answers.filter(
            answer => answer.id !== answerId
        );

        if (!question.answers.some(answer => answer.correct)) {
            question.answers[0].correct = true;
        }

        renderQuestionEditor();
    }

    async function removeQuestion(card) {
        if (state.questions.length <= MIN_QUESTIONS) {
            showToast("يجب أن يحتوي الاختبار على سؤال واحد على الأقل.", "error");
            return;
        }

        const confirmed = await openDialog({
            title: "حذف السؤال؟",
            message: "سيتم حذف هذا السؤال من الاختبار.",
            icon: "🗑️",
            confirmText: "حذف"
        });

        if (!confirmed) {
            return;
        }

        state.questions = state.questions.filter(
            question => question.id !== card.dataset.questionId
        );

        renderQuestionEditor();
        showToast("تم حذف السؤال.", "success");
    }

    /* ==========================================
       7. تحميل الصور محلياً
    ========================================== */

    function readImageFile(file) {
        return new Promise((resolve, reject) => {
            if (!file || !file.type.startsWith("image/")) {
                reject(new Error("اختر ملف صورة صالحاً."));
                return;
            }

            if (file.size > MAX_IMAGE_SIZE) {
                reject(
                    new Error("حجم الصورة كبير. الحد الأقصى 700 كيلوبايت.")
                );
                return;
            }

            const reader = new FileReader();

            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(new Error("تعذّر قراءة الصورة."));

            reader.readAsDataURL(file);
        });
    }

    async function handleQuestionImage(card, input) {
        const question = state.questions.find(
            item => item.id === card.dataset.questionId
        );

        const file = input.files?.[0];

        if (!question || !file) {
            return;
        }

        try {
            question.image = await readImageFile(file);

            const preview = $(".question-image-preview", card);

            preview.src = question.image;
            preview.hidden = false;

            showToast("تمت إضافة صورة السؤال.", "success");
        } catch (error) {
            showToast(error.message, "error");
        } finally {
            input.value = "";
        }
    }

    async function handleAnswerImage(card, row, input) {
        const question = state.questions.find(
            item => item.id === card.dataset.questionId
        );

        const answer = question?.answers.find(
            item => item.id === row.dataset.answerId
        );

        const file = input.files?.[0];

        if (!answer || !file) {
            return;
        }

        try {
            answer.image = await readImageFile(file);

            const preview = $(".answer-image-preview", row);

            preview.src = answer.image;
            preview.hidden = false;

            showToast("تمت إضافة صورة الخيار.", "success");
        } catch (error) {
            showToast(error.message, "error");
        } finally {
            input.value = "";
        }
    }

    /* ==========================================
       8. التحقق من الاختبار وحفظه
    ========================================== */

    function validateQuestions() {
        if (
            state.questions.length < MIN_QUESTIONS ||
            state.questions.length > MAX_QUESTIONS
        ) {
            showToast("عدد الأسئلة غير صالح.", "error");
            return false;
        }

        for (let i = 0; i < state.questions.length; i++) {
            const question = state.questions[i];

            if (!question.text.trim()) {
                showToast(`اكتب نص السؤال رقم ${i + 1}.`, "error");
                return false;
            }

            if (
                question.answers.length < MIN_ANSWERS ||
                question.answers.length > MAX_ANSWERS
            ) {
                showToast(
                    `راجع عدد الخيارات في السؤال رقم ${i + 1}.`,
                    "error"
                );
                return false;
            }

            if (question.answers.some(answer => !answer.text.trim())) {
                showToast(
                    `أكمل جميع الخيارات في السؤال رقم ${i + 1}.`,
                    "error"
                );
                return false;
            }

            if (!question.answers.some(answer => answer.correct)) {
                showToast(
                    `حدّد الإجابة الصحيحة للسؤال رقم ${i + 1}.`,
                    "error"
                );
                return false;
            }

            if (
                question.answers.filter(answer => answer.correct).length !== 1
            ) {
                showToast(
                    `يجب تحديد إجابة صحيحة واحدة فقط للسؤال رقم ${i + 1}.`,
                    "error"
                );
                return false;
            }
        }

        return true;
    }

    function getCreatorName() {
        return normalizeNa