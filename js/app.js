// Since the script is loaded at the bottom of the HTML body, 
// the DOM elements are already available.
// We can directly set the timeout to fade out the splash screen.
setTimeout(() => {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 500); // Wait for the 0.5s CSS transition to finish
    }
}, 2500);

/**
 * Handles navigation between different views
 * @param {string} targetViewId - The ID of the view to show
 */
function navigate(targetViewId) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.classList.remove('active');
    });
    
    const targetView = document.getElementById(targetViewId);
    if (targetView) {
        targetView.classList.add('active');
        window.scrollTo(0, 0);
    } else {
        console.error(`View with ID ${targetViewId} not found.`);
    }
}

/**
 * Calculates BMI based on height (cm) and weight (kg) inputs
 */
function calculateBMI() {
    const heightInput = document.getElementById('bmi-height');
    const weightInput = document.getElementById('bmi-weight');
    const resultValue = document.getElementById('bmi-result-value');
    const resultCategory = document.getElementById('bmi-result-category');
    const errorMsg = document.getElementById('bmi-error');
    const comingSoon = document.getElementById('bmi-coming-soon');
    
    if (errorMsg) {
        errorMsg.style.display = 'none';
        errorMsg.textContent = '';
    }
    
    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);
    
    if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
        if (errorMsg) {
            errorMsg.textContent = 'Please enter valid positive numbers for both height and weight.';
            errorMsg.style.display = 'block';
        }
        return;
    }
    
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const bmiRounded = bmi.toFixed(1);
    
    let category = '';
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal';
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }
    
    if (resultValue) resultValue.textContent = bmiRounded;
    if (resultCategory) resultCategory.textContent = category;
    if (comingSoon) comingSoon.style.display = 'none';
}

/**
 * Calculates BMR based on Mifflin-St Jeor equation
 */
function calculateBMR() {
    const ageInput = document.getElementById('bmr-age');
    const genderInput = document.getElementById('bmr-gender');
    const heightInput = document.getElementById('bmr-height');
    const weightInput = document.getElementById('bmr-weight');
    const resultValue = document.getElementById('bmr-result-value');
    const errorMsg = document.getElementById('bmr-error');
    const comingSoon = document.getElementById('bmr-coming-soon');
    
    if (errorMsg) {
        errorMsg.style.display = 'none';
        errorMsg.textContent = '';
    }
    
    const age = parseInt(ageInput.value, 10);
    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);
    const gender = genderInput.value;
    
    if (isNaN(age) || isNaN(heightCm) || isNaN(weightKg) || age <= 0 || heightCm <= 0 || weightKg <= 0) {
        if (errorMsg) {
            errorMsg.textContent = 'Please enter valid positive numbers for age, height, and weight.';
            errorMsg.style.display = 'block';
        }
        return;
    }
    
    let bmr = 0;
    if (gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }
    
    if (resultValue) {
        resultValue.innerHTML = `${Math.round(bmr)} <span>kcal</span>`;
    }
    if (comingSoon) comingSoon.style.display = 'none';
}

// --- Food Database ---
const foodDatabase = [
    { id: 'f1', name: 'Cooked White Rice', category: 'Rice', caloriesPer100g: 130, servingSize: '100–150g cooked per meal', description: 'Staple white rice, cooked' },
    { id: 'f2', name: 'Cooked Brown/Red Rice', category: 'Rice', caloriesPer100g: 111, servingSize: '100–150g cooked per meal', description: 'Whole grain rice, cooked' },
    { id: 'f3', name: 'Whole Wheat Atta Roti', category: 'Bread', caloriesPer100g: 297, servingSize: '1 medium piece', description: 'Flatbread made from whole wheat' },
    { id: 'f4', name: 'Chira (Flattened Rice)', category: 'Rice', caloriesPer100g: 346, servingSize: '30-40g dry', description: 'Beaten rice' },
    { id: 'f5', name: 'Muri (Puffed Rice)', category: 'Rice', caloriesPer100g: 402, servingSize: '1 cup', description: 'Puffed rice snack' },
    { id: 'f6', name: 'Masoor Dal (Cooked)', category: 'Lentils', caloriesPer100g: 116, servingSize: '100–150g cooked', description: 'Red lentil soup' },
    { id: 'f7', name: 'Moong Dal (Cooked)', category: 'Lentils', caloriesPer100g: 105, servingSize: '100–150g cooked', description: 'Yellow lentil soup' },
    { id: 'f8', name: 'Chola (Chickpeas, Cooked)', category: 'Lentils', caloriesPer100g: 164, servingSize: '100-150g cooked', description: 'Cooked chickpeas' },
    { id: 'f9', name: 'Rajma (Kidney Beans, Cooked)', category: 'Lentils', caloriesPer100g: 127, servingSize: '100-150g cooked', description: 'Cooked red kidney beans' },
    { id: 'f10', name: 'Potato', category: 'Veg', caloriesPer100g: 77, servingSize: '1 medium', description: 'Boiled or lightly cooked' },
    { id: 'f11', name: 'Sweet Potato', category: 'Veg', caloriesPer100g: 86, servingSize: '1 medium', description: 'Boiled or baked' },
    { id: 'f12', name: 'Bottle Gourd (Lau)', category: 'Veg', caloriesPer100g: 14, servingSize: '100–200g cooked', description: 'Lightly cooked calabash' },
    { id: 'f13', name: 'Pointed Gourd (Potol)', category: 'Veg', caloriesPer100g: 20, servingSize: '100–200g cooked', description: 'Lightly cooked parwal' },
    { id: 'f14', name: 'Bitter Gourd (Korola)', category: 'Veg', caloriesPer100g: 17, servingSize: '100–200g cooked', description: 'Lightly cooked bitter melon' },
    { id: 'f15', name: 'Eggplant (Begun)', category: 'Veg', caloriesPer100g: 25, servingSize: '100–200g cooked', description: 'Lightly cooked aubergine' },
    { id: 'f16', name: 'Ridge Gourd (Jhinga)', category: 'Veg', caloriesPer100g: 15, servingSize: '100–200g cooked', description: 'Lightly cooked' },
    { id: 'f17', name: 'Sponge Gourd (Dhundul)', category: 'Veg', caloriesPer100g: 15, servingSize: '100–200g cooked', description: 'Lightly cooked' },
    { id: 'f18', name: 'Okra (Dherosh)', category: 'Veg', caloriesPer100g: 33, servingSize: '100–200g cooked', description: 'Lightly cooked lady finger' },
    { id: 'f19', name: 'Yardlong Bean (Borboti)', category: 'Veg', caloriesPer100g: 47, servingSize: '100–200g cooked', description: 'Lightly cooked long beans' },
    { id: 'f20', name: 'Green Bean', category: 'Veg', caloriesPer100g: 31, servingSize: '100–200g cooked', description: 'Lightly cooked' },
    { id: 'f21', name: 'Pumpkin (Misti Kumra)', category: 'Veg', caloriesPer100g: 26, servingSize: '100–200g cooked', description: 'Lightly cooked' },
    { id: 'f22', name: 'Cauliflower (Fulkopi)', category: 'Veg', caloriesPer100g: 25, servingSize: '100–200g cooked', description: 'Lightly cooked' },
    { id: 'f23', name: 'Cabbage (Badhakopi)', category: 'Veg', caloriesPer100g: 25, servingSize: '100–200g cooked', description: 'Lightly cooked' },
    { id: 'f24', name: 'Spinach (Palong Shak)', category: 'Veg', caloriesPer100g: 23, servingSize: '100–200g cooked', description: 'Lightly cooked' },
    { id: 'f25', name: 'Pui Shak', category: 'Veg', caloriesPer100g: 23, servingSize: '100–200g cooked', description: 'Lightly cooked Malabar spinach' },
    { id: 'f26', name: 'Red Amaranth (Lal Shak)', category: 'Veg', caloriesPer100g: 23, servingSize: '100–200g cooked', description: 'Lightly cooked' },
    { id: 'f27', name: 'Water Spinach (Kolmi Shak)', category: 'Veg', caloriesPer100g: 19, servingSize: '100–200g cooked', description: 'Lightly cooked' },
    { id: 'f28', name: 'Cucumber (Shosha)', category: 'Veg', caloriesPer100g: 15, servingSize: '1 medium', description: 'Raw' },
    { id: 'f29', name: 'Tomato', category: 'Veg', caloriesPer100g: 18, servingSize: '1 medium', description: 'Raw or cooked' },
    { id: 'f30', name: 'Carrot (Gajor)', category: 'Veg', caloriesPer100g: 41, servingSize: '1 medium', description: 'Raw or cooked' },
    { id: 'f31', name: 'Guava (Peyara)', category: 'Fruit', caloriesPer100g: 68, servingSize: '1 medium fruit', description: 'Fresh fruit' },
    { id: 'f32', name: 'Papaya (Pepe)', category: 'Fruit', caloriesPer100g: 43, servingSize: '1 small bowl', description: 'Fresh ripe papaya' },
    { id: 'f33', name: 'Banana (Kola)', category: 'Fruit', caloriesPer100g: 89, servingSize: '1 medium fruit', description: 'Fresh fruit' },
    { id: 'f34', name: 'Orange (Komola)', category: 'Fruit', caloriesPer100g: 47, servingSize: '1 medium fruit', description: 'Fresh fruit' },
    { id: 'f35', name: 'Mango (Aam)', category: 'Fruit', caloriesPer100g: 60, servingSize: '1 medium fruit', description: 'Fresh ripe mango' },
    { id: 'f36', name: 'Apple', category: 'Fruit', caloriesPer100g: 52, servingSize: '1 medium fruit', description: 'Fresh fruit' },
    { id: 'f37', name: 'Hilsa Fish (Ilish)', category: 'Fish', caloriesPer100g: 275, servingSize: '80–120g cooked', description: 'Cooked preparation' },
    { id: 'f38', name: 'Rui Fish', category: 'Fish', caloriesPer100g: 110, servingSize: '80–120g cooked', description: 'Cooked preparation' },
    { id: 'f39', name: 'Katla Fish', category: 'Fish', caloriesPer100g: 110, servingSize: '80–120g cooked', description: 'Cooked preparation' },
    { id: 'f40', name: 'Tilapia Fish', category: 'Fish', caloriesPer100g: 96, servingSize: '80–120g cooked', description: 'Cooked preparation' },
    { id: 'f41', name: 'Pangas Fish', category: 'Fish', caloriesPer100g: 110, servingSize: '80–120g cooked', description: 'Cooked preparation' },
    { id: 'f42', name: 'Shrimp (Chingri)', category: 'Fish', caloriesPer100g: 99, servingSize: '80–120g cooked', description: 'Cooked preparation' },
    { id: 'f43', name: 'Skinless Chicken', category: 'Meat', caloriesPer100g: 165, servingSize: '80–120g cooked', description: 'Cooked lean chicken' },
    { id: 'f44', name: 'Lean Beef', category: 'Meat', caloriesPer100g: 250, servingSize: '80–120g cooked', description: 'Cooked lean beef' },
    { id: 'f45', name: 'Egg (Dim)', category: 'Egg', caloriesPer100g: 155, servingSize: '1 egg', description: 'Boiled or lightly cooked' },
    { id: 'f46', name: 'Unsweetened Low-Fat Yogurt (Tok Doi)', category: 'Dairy', caloriesPer100g: 63, servingSize: '100–150g', description: 'Plain yogurt' },
    { id: 'f47', name: 'Low-Fat Milk', category: 'Dairy', caloriesPer100g: 42, servingSize: '1 cup', description: 'Dairy milk' },
    { id: 'f48', name: 'Peanuts (Chinabadam)', category: 'Egg', caloriesPer100g: 567, servingSize: '30g', description: 'Roasted unsalted nuts' },
    { id: 'f49', name: 'Lemon (Lebu)', category: 'Veg', caloriesPer100g: 29, servingSize: '1 medium', description: 'Fresh lemon juice' },
    { id: 'f50', name: 'Coconut Water (Daber Pani)', category: 'Fruit', caloriesPer100g: 19, servingSize: '1 cup', description: 'Fresh coconut water' }
];

const diabetesFoods = [
    { name: 'Atta Roti', serving: '1 medium piece', reason: 'High in fiber, causes a slower rise in blood sugar compared to white flour.', prep: 'Avoid applying ghee or butter.' },
    { name: 'Cooked Brown/Red Rice', serving: '100–150g cooked per meal', reason: 'Lower glycemic index than white rice, better for blood sugar management.', prep: 'Requires portion control. Balance with a large serving of vegetables.' },
    { name: 'Cooked White Rice', serving: '100-150g cooked per meal', reason: 'A familiar staple that can be included safely when strictly portion-controlled.', prep: 'Do not eat unlimited amounts. Always pair with plenty of non-starchy vegetables and protein.' },
    { name: 'Masoor Dal', serving: '100–150g cooked', reason: 'Excellent source of plant protein and soluble fiber, which helps stabilize blood sugar.', prep: 'Cook with minimal oil and avoid heavy tarka (tempering) with ghee.' },
    { name: 'Moong Dal', serving: '100–150g cooked', reason: 'Light, nutritious, and high in fiber.', prep: 'Cook as a soup or thick dal with vegetables.' },
    { name: 'Chola (Chickpeas)', serving: '100–150g cooked', reason: 'High in complex carbohydrates, fiber, and protein.', prep: 'Boil or lightly spice with minimal oil.' },
    { name: 'Bitter Gourd (Korola)', serving: '100–200g cooked', reason: 'Contains compounds that may improve glucose tolerance.', prep: 'Lightly fry or boil with minimal oil.' },
    { name: 'Bottle Gourd (Lau)', serving: '100–200g cooked', reason: 'Very low in calories and carbohydrates, high in water content.', prep: 'Cook as a light curry or soup.' },
    { name: 'Pointed Gourd (Potol)', serving: '100–200g cooked', reason: 'Low in calories, high in vitamins and fiber.', prep: 'Lightly cooked in a mixed vegetable curry.' },
    { name: 'Ridge Gourd (Jhinga)', serving: '100–200g cooked', reason: 'Low in carbohydrates and high in dietary fiber.', prep: 'Cook with minimal oil.' },
    { name: 'Okra (Dherosh)', serving: '100–200g cooked', reason: 'Rich in soluble fiber which helps slow sugar absorption.', prep: 'Lightly stir-fry or boil.' },
    { name: 'Spinach (Palong Shak)', serving: '100–200g cooked', reason: 'Very low in carbs and rich in vitamins and minerals.', prep: 'Cook with a small amount of oil and garlic.' },
    { name: 'Pui Shak', serving: '100–200g cooked', reason: 'Nutritious leafy green with good fiber content.', prep: 'Can be cooked with lentils or fish.' },
    { name: 'Cucumber (Shosha)', serving: '1 medium', reason: 'Hydrating, very low in calories and carbohydrates.', prep: 'Eat raw as a salad before or with meals.' },
    { name: 'Tomato', serving: '1 medium', reason: 'Low GI and packed with antioxidants like lycopene.', prep: 'Eat raw in salads or cooked in curries.' },
    { name: 'Guava (Peyara)', serving: '1 medium fruit', reason: 'Low glycemic index and very high in vitamin C and fiber.', prep: 'Eat fresh with the skin.' },
    { name: 'Papaya (Pepe)', serving: '1 small bowl', reason: 'Good source of fiber and antioxidants with a moderate GI.', prep: 'Eat fresh in moderation.' },
    { name: 'Apple', serving: '1 medium fruit', reason: 'Rich in fiber and polyphenols which can improve insulin sensitivity.', prep: 'Eat fresh with the skin.' },
    { name: 'Boiled Egg (Dim)', serving: '1 egg', reason: 'Excellent source of high-quality protein with no carbohydrates.', prep: 'Boiled is preferred over fried.' },
    { name: 'Non-fried Fish (Rui, Katla, Ilish)', serving: '80–120g cooked', reason: 'High in protein and healthy fats, with zero carbohydrates.', prep: 'Steamed, boiled, or cooked in a light curry. Avoid deep-frying.' }
];

const cholesterolFoods = [
    { name: 'Atta Roti', serving: '1 medium piece', reason: 'Can be part of a heart-healthy eating pattern. Whole grains provide fiber that helps manage cholesterol.', prep: 'Make without added oil or ghee.' },
    { name: 'Brown/Red Rice', serving: '100–150g cooked per meal', reason: 'Can be part of a heart-healthy eating pattern. Contains more fiber than white rice.', prep: 'Portion control is key. Boil rather than frying.' },
    { name: 'Masoor Dal', serving: '100–150g cooked', reason: 'Can be part of a heart-healthy eating pattern. High in soluble fiber which binds to cholesterol.', prep: 'Avoid excessive ghee/butter/oil during preparation.' },
    { name: 'Moong Dal', serving: '100–150g cooked', reason: 'Can be part of a heart-healthy eating pattern. Plant-based protein free from saturated fats.', prep: 'Avoid excessive ghee/butter/oil.' },
    { name: 'Chola (Chickpeas)', serving: '100–150g cooked', reason: 'Can be part of a heart-healthy eating pattern. Rich in soluble fiber.', prep: 'Lightly spiced, avoid deep frying.' },
    { name: 'Rajma (Kidney Beans)', serving: '100–150g cooked', reason: 'Can be part of a heart-healthy eating pattern. Excellent source of cholesterol-lowering soluble fiber.', prep: 'Cook with limited oil.' },
    { name: 'Okra (Dherosh)', serving: '100–200g cooked', reason: 'Can be part of a heart-healthy eating pattern. The mucilage (gel) binds to cholesterol during digestion.', prep: 'Lightly cooked with limited oil.' },
    { name: 'Eggplant (Begun)', serving: '100–200g cooked', reason: 'Can be part of a heart-healthy eating pattern. High in fiber and antioxidants.', prep: 'Bake, roast, or lightly cook. Avoid deep-frying.' },
    { name: 'Bottle Gourd (Lau)', serving: '100–200g cooked', reason: 'Can be part of a heart-healthy eating pattern. Low in calories and fat.', prep: 'Lightly cooked with limited oil.' },
    { name: 'Cabbage (Badhakopi)', serving: '100–200g cooked', reason: 'Can be part of a heart-healthy eating pattern. High in fiber and heart-healthy nutrients.', prep: 'Lightly cooked or eaten raw in salads.' },
    { name: 'Spinach (Palong Shak)', serving: '100–200g cooked', reason: 'Can be part of a heart-healthy eating pattern. Contains lutein which may protect against arterial wall thickening.', prep: 'Lightly cooked with limited oil.' },
    { name: 'Pui Shak', serving: '100–200g cooked', reason: 'Can be part of a heart-healthy eating pattern. Good source of dietary fiber.', prep: 'Lightly cooked with limited oil.' },
    { name: 'Guava (Peyara)', serving: '1 medium fruit', reason: 'Can be part of a heart-healthy eating pattern. Rich in soluble fiber and antioxidants.', prep: 'Eat fresh.' },
    { name: 'Papaya (Pepe)', serving: '1 small bowl', reason: 'Can be part of a heart-healthy eating pattern. Contains antioxidants that prevent cholesterol oxidation.', prep: 'Eat fresh.' },
    { name: 'Orange (Komola)', serving: '1 medium fruit', reason: 'Can be part of a heart-healthy eating pattern. Rich in pectin, a cholesterol-lowering fiber.', prep: 'Eat whole fruit rather than juice.' },
    { name: 'Apple', serving: '1 medium fruit', reason: 'Can be part of a heart-healthy eating pattern. High in pectin and polyphenols.', prep: 'Eat whole with the skin.' },
    { name: 'Rui Fish', serving: '80–120g cooked', reason: 'Can be part of a heart-healthy eating pattern. Good source of protein and some omega-3s.', prep: 'Steamed, boiled, baked, grilled or lightly cooked rather than deep-fried.' },
    { name: 'Tilapia Fish', serving: '80–120g cooked', reason: 'Can be part of a heart-healthy eating pattern. Lean protein source.', prep: 'Steamed, boiled, baked, grilled or lightly cooked rather than deep-fried.' },
    { name: 'Skinless Chicken', serving: '80–120g cooked', reason: 'Can be part of a heart-healthy eating pattern. Lean protein lower in saturated fat than red meat.', prep: 'Ensure it is skinless and cooked with limited oil.' },
    { name: 'Unsweetened Low-Fat Yogurt (Tok Doi)', serving: '100–150g', reason: 'Can be part of a heart-healthy eating pattern. Provides dairy benefits without high saturated fat.', prep: 'Prefer low-fat/unsweetened versions.' }
];

// --- Daily Food Log State ---
let dailyFoodLog = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
};

// --- History & Weight Progress State ---
let weightHistory = []; // TODO: Will be replaced by Supabase state


// --- Initialization ---
function init() {
    loadFoodLog();
    populateFoodSelector();
    renderFoodLog();
    
    // Render dynamic libraries
    renderFoodLibrary('All');
    renderDiabetesGuide();
    renderCholesterolGuide();
    
    // Render Weight Progress
    renderWeightHistory(weightHistory);
    renderWeightProgress(weightHistory);
    updateWeightSummary(weightHistory);
}

// --- Food Library Rendering ---
function renderFoodLibrary(filterCategory) {
    const list = document.getElementById('food-library-list');
    if (!list) return;
    
    list.innerHTML = '';
    
    let filtered = foodDatabase;
    if (filterCategory !== 'All') {
        filtered = foodDatabase.filter(f => f.category === filterCategory);
    }
    
    filtered.forEach(food => {
        let emoji = '🍲';
        if (food.category === 'Rice') emoji = '🍚';
        if (food.category === 'Bread') emoji = '🫓';
        if (food.category === 'Veg') emoji = '🥗';
        if (food.category === 'Fruit') emoji = '🍎';
        if (food.category === 'Fish') emoji = '🐟';
        if (food.category === 'Meat') emoji = '🍗';
        if (food.category === 'Egg') emoji = '🥚';
        if (food.category === 'Lentils') emoji = '🥣';
        if (food.category === 'Dairy') emoji = '🥛';
        
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <div class="food-image-area"><span class="food-emoji">${emoji}</span></div>
            <div class="food-info-area">
                <h3 class="food-name">${food.name}</h3>
                <p class="food-method">${food.description || ''}</p>
                <div class="food-nutrition" style="margin-top: 4px; display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
                    <div style="display: flex; gap: 8px;">
                        <span class="nutrition-badge">Per 100g</span>
                        <span class="calorie-text">${food.caloriesPer100g} kcal</span>
                    </div>
                    <div style="font-size: 0.85rem; color: #555;">
                        <strong>Suggested Serving:</strong> ${food.servingSize}
                    </div>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

function filterFoodLibrary(category) {
    // Update active button state
    const buttons = document.querySelectorAll('#food-library-filters .pill-btn');
    buttons.forEach(btn => {
        if (btn.textContent === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderFoodLibrary(category);
}

function searchFoodLibrary() {
    const query = document.getElementById('food-search-input').value.toLowerCase();
    const list = document.getElementById('food-library-list');
    if (!list) return;
    
    list.innerHTML = '';
    
    // Reset filters to All
    const buttons = document.querySelectorAll('#food-library-filters .pill-btn');
    buttons.forEach(btn => {
        if (btn.textContent === 'All') btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    const filtered = foodDatabase.filter(f => f.name.toLowerCase().includes(query) || f.category.toLowerCase().includes(query));
    
    filtered.forEach(food => {
        let emoji = '🍲';
        if (food.category === 'Rice') emoji = '🍚';
        if (food.category === 'Bread') emoji = '🫓';
        if (food.category === 'Veg') emoji = '🥗';
        if (food.category === 'Fruit') emoji = '🍎';
        if (food.category === 'Fish') emoji = '🐟';
        if (food.category === 'Meat') emoji = '🍗';
        if (food.category === 'Egg') emoji = '🥚';
        if (food.category === 'Lentils') emoji = '🥣';
        if (food.category === 'Dairy') emoji = '🥛';
        
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <div class="food-image-area"><span class="food-emoji">${emoji}</span></div>
            <div class="food-info-area">
                <h3 class="food-name">${food.name}</h3>
                <p class="food-method">${food.description || ''}</p>
                <div class="food-nutrition" style="margin-top: 4px; display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
                    <div style="display: flex; gap: 8px;">
                        <span class="nutrition-badge">Per 100g</span>
                        <span class="calorie-text">${food.caloriesPer100g} kcal</span>
                    </div>
                    <div style="font-size: 0.85rem; color: #555;">
                        <strong>Suggested Serving:</strong> ${food.servingSize}
                    </div>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

function renderDiabetesGuide() {
    const list = document.getElementById('diabetes-guide-list');
    if (!list) return;
    
    list.innerHTML = '';
    
    diabetesFoods.forEach(food => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <div class="food-image-area"><span class="food-emoji">🩸</span></div>
            <div class="food-info-area">
                <h3 class="food-name">${food.name}</h3>
                <div class="food-nutrition" style="margin-top: 4px;">
                    <span class="nutrition-badge">Suggested Serving: ${food.serving}</span>
                </div>
                <p class="food-method" style="margin-top: 6px; color: #333;"><strong>Why it can be included:</strong> ${food.reason}</p>
                <p class="food-method" style="margin-top: 4px; color: #c53030;"><strong>Preparation/Portion Note:</strong> ${food.prep}</p>
            </div>
        `;
        list.appendChild(card);
    });
}

function renderCholesterolGuide() {
    const list = document.getElementById('cholesterol-guide-list');
    if (!list) return;
    
    list.innerHTML = '';
    
    cholesterolFoods.forEach(food => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <div class="food-image-area"><span class="food-emoji">🫀</span></div>
            <div class="food-info-area">
                <h3 class="food-name">${food.name}</h3>
                <div class="food-nutrition" style="margin-top: 4px;">
                    <span class="nutrition-badge">Suggested Serving: ${food.serving}</span>
                </div>
                <p class="food-method" style="margin-top: 6px; color: #333;"><strong>Why it can be included:</strong> ${food.reason}</p>
                <p class="food-method" style="margin-top: 4px; color: #c53030;"><strong>Preparation Note:</strong> ${food.prep}</p>
            </div>
        `;
        list.appendChild(card);
    });
}


// --- Local Storage Logic ---
function loadFoodLog() {
    const savedLog = localStorage.getItem('nutritrack_daily_log');
    if (savedLog) {
        try {
            dailyFoodLog = JSON.parse(savedLog);
        } catch (e) {
            console.error('Error parsing saved food log', e);
        }
    }
}

function saveFoodLog() {
    localStorage.setItem('nutritrack_daily_log', JSON.stringify(dailyFoodLog));
}

// --- Food Selector UI Logic ---
function populateFoodSelector() {
    const select = document.getElementById('food-select-input');
    if (!select) return;
    
    select.innerHTML = '';
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select Food --';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);
    
    const sortedFoods = [...foodDatabase].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedFoods.forEach(food => {
        const option = document.createElement('option');
        option.value = food.id;
        option.textContent = `${food.name} (${food.caloriesPer100g} kcal/100g)`;
        select.appendChild(option);
    });
}

function openFoodSelector(mealType) {
    document.getElementById('current-meal-type').value = mealType;
    
    const select = document.getElementById('food-select-input');
    if (select) select.selectedIndex = 0;
    
    const gramsInput = document.getElementById('food-grams-input');
    if (gramsInput) gramsInput.value = '';
    
    const titleMap = {
        'breakfast': 'Breakfast',
        'lunch': 'Lunch',
        'dinner': 'Dinner',
        'snacks': 'Snacks'
    };
    document.getElementById('food-selector-title').textContent = `Add to ${titleMap[mealType]}`;
    
    document.getElementById('food-selector-overlay').style.display = 'flex';
}

function closeFoodSelector() {
    document.getElementById('food-selector-overlay').style.display = 'none';
}

// --- Core Food Log Logic ---
function addFoodEntry() {
    const mealType = document.getElementById('current-meal-type').value;
    const foodId = document.getElementById('food-select-input').value;
    const gramsInput = document.getElementById('food-grams-input').value;
    const grams = parseFloat(gramsInput);
    
    if (!foodId) {
        alert('Please select a food.');
        return;
    }
    
    if (isNaN(grams) || grams <= 0) {
        alert('Please enter a valid amount in grams.');
        return;
    }
    
    const food = foodDatabase.find(f => f.id === foodId);
    if (!food) return;
    
    const calculatedCalories = (food.caloriesPer100g * grams) / 100;
    
    const newEntry = {
        id: Date.now().toString(),
        foodId: food.id,
        name: food.name,
        grams: grams,
        calories: Math.round(calculatedCalories)
    };
    
    dailyFoodLog[mealType].push(newEntry);
    
    saveFoodLog();
    renderFoodLog();
    closeFoodSelector();
}

function removeFoodEntry(mealType, entryId) {
    dailyFoodLog[mealType] = dailyFoodLog[mealType].filter(entry => entry.id !== entryId);
    saveFoodLog();
    renderFoodLog();
}

function renderFoodLog() {
    const meals = ['breakfast', 'lunch', 'dinner', 'snacks'];
    let dailyTotal = 0;
    
    meals.forEach(meal => {
        const listContainer = document.getElementById(`${meal}-list`);
        const totalSpan = document.getElementById(`${meal}-total`);
        
        if (!listContainer || !totalSpan) return;
        
        listContainer.innerHTML = '';
        let mealTotal = 0;
        
        dailyFoodLog[meal].forEach(entry => {
            mealTotal += entry.calories;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'food-log-item';
            itemDiv.innerHTML = `
                <div class="food-log-info">
                    <div class="food-log-name">${entry.name}</div>
                    <div class="food-log-details">${entry.grams}g</div>
                </div>
                <div class="food-log-calories">${entry.calories} kcal</div>
                <button class="remove-btn" onclick="removeFoodEntry('${meal}', '${entry.id}')" title="Remove">×</button>
            `;
            listContainer.appendChild(itemDiv);
        });
        
        totalSpan.textContent = `${mealTotal} kcal`;
        dailyTotal += mealTotal;
    });
    
    const dailyTotalEl = document.getElementById('daily-total-calories');
    if (dailyTotalEl) {
        dailyTotalEl.textContent = dailyTotal;
    }
}

// --- Account Menu Logic ---
function toggleAccountMenu() {
    const menu = document.getElementById('account-dropdown-menu');
    if (menu) {
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('account-dropdown-menu');
    const iconBtn = document.getElementById('account-icon-btn');
    if (menu && menu.style.display === 'block') {
        if (iconBtn && !menu.contains(event.target) && !iconBtn.contains(event.target)) {
            menu.style.display = 'none';
        }
    }
});

function handleAccountAction(action) {
    const menu = document.getElementById('account-dropdown-menu');
    if (menu) menu.style.display = 'none';
    
    if (action === 'logout') {
        navigate('login-screen');
    } else {
        navigate(action);
    }
}

// --- Auth & Profile Frontend Stubs ---

function initiateLogin(event) {
    event.preventDefault();
    navigate('home-screen');
}

function initiateSignUp(event) {
    event.preventDefault();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const errorMsg = document.getElementById('signup-error');
    
    if (password !== confirmPassword) {
        if (errorMsg) {
            errorMsg.textContent = 'Passwords do not match.';
            errorMsg.style.display = 'block';
        }
        return;
    }
    
    if (errorMsg) errorMsg.style.display = 'none';
    navigate('profile-setup');
}

function checkAgeNotice() {
    const ageInput = document.getElementById('profile-age');
    const notice = document.getElementById('under-12-notice');
    if (ageInput && notice) {
        const age = parseInt(ageInput.value, 10);
        if (!isNaN(age) && age < 12) {
            notice.style.display = 'block';
        } else {
            notice.style.display = 'none';
        }
    }
}

// --- History & Weight Progress ---

function validateWeight(weight, dateStr) {
    if (!weight || isNaN(weight)) return "Please enter a valid weight.";
    if (weight <= 0) return "Weight must be greater than 0.";
    if (weight > 500) return "Please enter a realistic weight.";
    if (!dateStr) return "Please select a date.";
    return null; // Valid
}

function recordWeight(event) {
    event.preventDefault();
    const dateInput = document.getElementById('weight-date');
    const weightInput = document.getElementById('weight-input');
    const errorMsg = document.getElementById('weight-error');
    
    if (!dateInput || !weightInput || !errorMsg) return;

    const dateStr = dateInput.value;
    const weightVal = parseFloat(weightInput.value);

    // Validation
    const error = validateWeight(weightVal, dateStr);
    if (error) {
        errorMsg.textContent = error;
        errorMsg.style.display = 'block';
        return;
    }

    // Clear error
    errorMsg.style.display = 'none';

    // Create record
    const newRecord = {
        id: Date.now().toString(),
        weight: weightVal,
        recorded_at: dateStr
    };

    // Update in-memory array (TODO: Replace with Supabase INSERT here)
    weightHistory.push(newRecord);

    // Clear form
    dateInput.value = '';
    weightInput.value = '';

    // Re-render UI
    renderWeightHistory(weightHistory);
    renderWeightProgress(weightHistory);
    updateWeightSummary(weightHistory);
}

function renderWeightHistory(records) {
    const emptyState = document.getElementById('weight-empty-state');
    const listContainer = document.getElementById('weight-history-list');
    
    if (!emptyState || !listContainer) return;

    if (!records || records.length === 0) {
        emptyState.style.display = 'block';
        listContainer.style.display = 'none';
        listContainer.innerHTML = '';
        return;
    }

    emptyState.style.display = 'none';
    listContainer.style.display = 'flex';
    listContainer.style.flexDirection = 'column';
    listContainer.style.gap = '8px';
    listContainer.innerHTML = '';

    // Sort descending by date
    const sorted = [...records].sort((a, b) => new Date(b.recorded_at) - new Date(a.recorded_at));

    sorted.forEach(record => {
        const item = document.createElement('div');
        item.className = 'history-item';
        // Add basic inline styling similar to a card for the item
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.padding = '12px';
        item.style.backgroundColor = 'var(--card-bg, #ffffff)';
        item.style.borderRadius = 'var(--radius-md, 8px)';
        item.style.boxShadow = 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1))';
        item.style.border = '1px solid var(--border-color, #e2e8f0)';
        
        const dateSpan = document.createElement('span');
        dateSpan.style.fontWeight = '500';
        // Format date to local readable format nicely
        const d = new Date(record.recorded_at);
        // Use UTC methods or just parse the string parts to avoid timezone shift on 'YYYY-MM-DD'
        const parts = record.recorded_at.split('-');
        const dateDisplay = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : record.recorded_at;
        dateSpan.textContent = dateDisplay;

        const rightContainer = document.createElement('div');
        rightContainer.style.display = 'flex';
        rightContainer.style.alignItems = 'center';
        rightContainer.style.gap = '12px';

        const weightSpan = document.createElement('span');
        weightSpan.style.fontWeight = 'bold';
        weightSpan.style.color = 'var(--primary-color, #d53f8c)';
        weightSpan.textContent = `${record.weight.toFixed(1)} kg`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.style.background = 'none';
        deleteBtn.style.border = 'none';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.fontSize = '1.1rem';
        deleteBtn.style.opacity = '0.7';
        deleteBtn.title = "Delete record";
        deleteBtn.onclick = () => deleteWeightRecord(record.id);

        rightContainer.appendChild(weightSpan);
        rightContainer.appendChild(deleteBtn);

        item.appendChild(dateSpan);
        item.appendChild(rightContainer);
        listContainer.appendChild(item);
    });
}

function deleteWeightRecord(id) {
    if (!confirm("Are you sure you want to delete this weight record?")) return;
    
    // Update in-memory array (TODO: Replace with Supabase DELETE here)
    weightHistory = weightHistory.filter(record => record.id !== id);
    
    // Re-render UI
    renderWeightHistory(weightHistory);
    renderWeightProgress(weightHistory);
    updateWeightSummary(weightHistory);
}

function updateWeightSummary(records) {
    const statStarting = document.getElementById('stat-starting');
    const statCurrent = document.getElementById('stat-current');
    const statChange = document.getElementById('stat-change');
    
    if (!statStarting || !statCurrent || !statChange) return;

    if (!records || records.length === 0) {
        statStarting.textContent = '-- kg';
        statCurrent.textContent = '-- kg';
        statChange.textContent = '-- kg';
        statChange.style.color = 'var(--text-muted, #718096)';
        return;
    }

    const sortedAsc = [...records].sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    const startingWeight = sortedAsc[0].weight;
    const currentWeight = sortedAsc[sortedAsc.length - 1].weight;
    const change = currentWeight - startingWeight;

    statStarting.textContent = `${startingWeight.toFixed(1)} kg`;
    statCurrent.textContent = `${currentWeight.toFixed(1)} kg`;
    
    const changeText = Math.abs(change).toFixed(1) + ' kg';
    if (change > 0) {
        statChange.textContent = `+${changeText}`;
        statChange.style.color = '#e53e3e'; // red for gain
    } else if (change < 0) {
        statChange.textContent = `-${changeText}`;
        statChange.style.color = '#38a169'; // green for loss
    } else {
        statChange.textContent = `0 kg`;
        statChange.style.color = 'var(--text-muted, #718096)';
    }
}

function renderWeightProgress(records) {
    // TODO: When Supabase and a chart library are connected, use records to draw the graph here.
    // For now, the static HTML placeholder is maintained as per user request.
}

function completeProfile(event) {
    event.preventDefault();
    checkAgeNotice();
    navigate('home-screen');
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }
}

// Initialize when script loads
init();
