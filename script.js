const quizQuestions = [
    { question: "1. En sevdiğim renk nedir?", options: ["Mavi", "Siyah", "Bordo", "Yeşil"], correctAnswer: "Siyah" },
    { question: "2. Tatil için gitmeyi en çok istediğim yer neresi?", options: ["Maldivler", "Giresun", "İtalya (Roma)", "Paris"], correctAnswer: "Maldivler" },
    { question: "3. En sevdiğim yemek hangisidir?", options: ["Mantı", "Kara Lahana", "ET Ürünleri", "Sushi", "Hepsi"], correctAnswer: "Hepsi" },
    { question: "4. En çok korktuğum şey nedir?", options: ["Yükseklik", "Böcekler", "Kaybetmek", "Karanlık"], correctAnswer: "Kaybetmek" },
    { question: "5. Hafta sonu en sevdiğim aktivite nedir?", options: ["Uzun uyumak", "Film izlemek", "Alışveriş", "Dışarıda kahvaltı"], correctAnswer: "Uzun uyumak" },
    { question: "6. Çocukluğumda en çok oynadığım oyun hangisidir?", options: ["Saklambaç", "Futbol", "Misket", "Kızmabirader"], correctAnswer: "Futbol" },
    { question: "7. En sevdiğim film türü nedir?", options: ["Bilim Kurgu", "Romantik Komedi", "Aksiyon", "Tarihi Dram"], correctAnswer: "Romantik Komedi" },
    { question: "8. Okuldaki lakabım neydi?", options: ["Çalışkan", "Çılgın", "Hırçın", "Sessiz"], correctAnswer: "Çılgın" },
    { question: "9. Hangi enstrümanı çalmayı/öğrenmeyi çok isterdim?", options: ["Gitar/Kemençe", "Piyano", "Keman", "Bateri"], correctAnswer: "Gitar/Kemençe" },
    { question: "10. Sabah kahvemi nasıl içerim?", options: ["Sade (Filtre)", "Sütlü (Latte/Cappuccino)", "Bol Şekerli Türk Kahvesi", "Hiç içmem"], correctAnswer: "Bol Şekerli Türk Kahvesi" },
    { question: "11. Stres attığım favori yöntemim nedir?", options: ["Spor yapmak", "Müzik dinlemek", "Temizlik yapmak", "Yemek yemek"], correctAnswer: "Müzik dinlemek" },
    { question: "12. Hangi mevsimi kesinlikle daha çok severim?", options: ["İlkbahar", "Yaz", "Sonbahar", "Kış"], correctAnswer: "Sonbahar" },
    { question: "13. İdeal bir randevu nasıl olmalıdır?", options: ["Lüks bir akşam yemeği", "Sade bir kahve buluşması", "Açık hava aktivitesi", "Evde film izlemek"], correctAnswer: "Açık hava aktivitesi" },
    { question: "14. Erken kalkan mı, yoksa gece kuşu muyum?", options: ["Erken kalkan", "Gece kuşu", "Duruma göre değişir", "Öğle 11'den önce uyanmam"], correctAnswer: "Gece kuşu" },
    { question: "15. Karakterimde en belirgin özellik ne?", options: ["İnatçılık", "Duygusallık", "Mantık", "Mizah"], correctAnswer: "İnatçılık" },
    { question: "16. En nefret ettiğim ev işi nedir?", options: ["Bulaşık yıkamak", "Çamaşır katlamak", "Toz almak", "Süpürmek"], correctAnswer: "Çamaşır katlamak" },
    { question: "17. Bir seyahatte yanıma alacağım ilk şey ne olur?", options: ["Kamera", "Kitap", "Kulaklık", "Atıştırmalıklar"], correctAnswer: "Kulaklık" },
    { question: "18. Romantik miyim, yoksa gerçekçi mi?", options: ["Kesinlikle Romantik", "Çoğunlukla Romantik", "Çoğunlukla Gerçekçi", "Kesinlikle Gerçekçi"], correctAnswer: "Çoğunlukla Romantik" },
    { question: "19. Hangi teknolojik alete en çok zaman harcarım?", options: ["Telefon", "Bilgisayar", "Televizyon", "Oyun Konsolu"], correctAnswer: "Telefon" },
    { question: "20. Seninle ilgili en çok neyi seviyorum?", options: ["Gülüşün", "Zekân", "Sabrın", "Birlikte geçirdiğimiz anlar"], correctAnswer: "Birlikte geçirdiğimiz anlar" }
];

let currentQuestionIndex = 0;
let score = 0;
let finalMessage = "";

const questionArea = document.getElementById('question-area');
const optionsContainer = document.getElementById('options-container');
const resultArea = document.getElementById('result-area');
const scoreText = document.getElementById('score-text');
const resultMessage = document.getElementById('result-message');
const userNameInput = document.getElementById('user-name-input');
const sendResultsButton = document.getElementById('send-results-button');

const myName = "Ilgın";

// Gizli form elemanları
const hiddenSenderName = document.getElementById('hidden-sender-name');
const hiddenScore = document.getElementById('hidden-score');
const hiddenPercentage = document.getElementById('hidden-percentage');
const hiddenMessage = document.getElementById('hidden-message');
const hiddenSubmitButton = document.getElementById('hidden-submit-button');


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    finalMessage = "";
    
    questionArea.style.display = 'flex';
    resultArea.style.display = 'none';
    userNameInput.value = ''; 
    sendResultsButton.style.pointerEvents = 'auto'; // Gönder butonunu tekrar aktif et
    
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showResults();
        return;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    document.getElementById('question-text').textContent = currentQuestion.question; 
    
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        // Cevap kontrolü için 'checkAnswer' fonksiyonunu çağır
        button.onclick = () => checkAnswer(option, currentQuestion.correctAnswer); 
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
    }
    
    const buttons = optionsContainer.querySelectorAll('.option-button');
    buttons.forEach(button => {
        button.style.pointerEvents = 'none'; // Butonları devre dışı bırak
        if (button.textContent === selectedOption) {
            button.style.backgroundColor = selectedOption === correctAnswer ? '#4caf50' : '#f44336';
            button.style.color = 'white';
        }
        // Doğru cevabı işaretle (Yanlış cevap verildiyse)
        if (button.textContent === correctAnswer && selectedOption !== correctAnswer) {
            button.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
        }
    });
    
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 700);
}

function showResults() {
    questionArea.style.display = 'none';
    resultArea.style.display = 'block';

    const total = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);
    
    scoreText.textContent = `${score} / ${total} doğru cevap! (%${percentage})`;

    let message = "";
    
    if (percentage === 100) {
        message = `MÜKEMMEL! ${myName}'ı %${percentage} oranında tanıyorsun. Sen benim ruh eşimsin! Aşkımız sonsuz. 💍`;
        scoreText.style.color = '#4caf50';
    } else if (percentage >= 85) {
        message = `İNANILMAZ! ${myName}'ı %${percentage} oranında tanıyorsun. Bu inanılmaz bir uyum! Küçük detayları öğrenmek için daha fazla sohbet edelim. 🎉`;
        scoreText.style.color = '#ff9800'; 
    } else if (percentage >= 60) {
        message = `BAŞARILI! ${myName}'ı %${percentage} oranında tanıyorsun ama onu tanımak için daha fazla zaman yarat. Geri kalan detayları birlikte keşfedelim! 😉`;
        scoreText.style.color = '#d81b60'; 
    } else if (percentage >= 40) {
         message = `İYİ BAŞLANGIÇ! ${myName}'ı %${percentage} oranında tanıyorsun. Daha öğreneceğin çok şey var! Hadi hemen bir randevu ayarlayıp sohbet edelim. 📞`;
         scoreText.style.color = '#3498db';
    } else {
        message = `EYVAH! ${myName}'ı henüz %${percentage} oranında tanıyorsun. İlişkimizi kurtarmak için acilen benimle daha çok konuşman gerekiyor! 😅`;
        scoreText.style.color = '#f44336';
    }

    resultMessage.textContent = message;
    finalMessage = message; 
}

// SONUÇLARI MAİL İLE GÖNDERME FONKSİYONU
function sendResults() {
    const senderName = userNameInput.value.trim();
    
    if (senderName === "") {
        alert("Lütfen adınızı girerek sonucu göndermeyi tamamlayın.");
        return;
    }
    
    const total = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);

    // 1. Gizli Form Alanlarını Doldur
    hiddenSenderName.value = senderName;
    hiddenScore.value = `${score} / ${total}`;
    hiddenPercentage.value = `${percentage}%`;
    hiddenMessage.value = finalMessage;
    
    // 2. Formu Otomatik Gönder
    // Not: Bu kısım sadece Formspree hesabınızın ayarları doğruysa çalışır.
    hiddenSubmitButton.click(); 
    
    // Kullanıcıyı bilgilendir ve butonu devre dışı bırak
    alert(`Sonuçlar başarıyla ${myName}'a gönderildi! Teşekkürler.`);
    sendResultsButton.style.pointerEvents = 'none';
}

// Uygulamayı başlat
startQuiz();