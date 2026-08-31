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
    // Get all views
    const views = document.querySelectorAll('.view');
    
    // Hide all views
    views.forEach(view => {
        view.classList.remove('active');
    });
    
    // Show target view
    const targetView = document.getElementById(targetViewId);
    if (targetView) {
        targetView.classList.add('active');
        
        // Scroll to top when changing views
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
    
    // Reset error message
    if (errorMsg) {
        errorMsg.style.display = 'none';
        errorMsg.textContent = '';
    }
    
    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);
    
    // Validate inputs
    if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
        if (errorMsg) {
            errorMsg.textContent = 'Please enter valid positive numbers for both height and weight.';
            errorMsg.style.display = 'block';
        }
        return;
    }
    
    // BMI Calculation: weight (kg) / (height (m) * height (m))
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const bmiRounded = bmi.toFixed(1);
    
    // Determine Category
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
    
    // Update UI
    if (resultValue) resultValue.textContent = bmiRounded;
    if (resultCategory) resultCategory.textContent = category;
    
    // Hide the coming soon placeholder
    if (comingSoon) comingSoon.style.display = 'none';
}

// --- Food Database ---
const foodDatabase = [
    { id: 'f1', name: 'White Rice', category: 'Rice', caloriesPer100g: 130 },
    { id: 'f2', name: 'Ruti (Whole Wheat)', category: 'Bread', caloriesPer100g: 297 },
    { id: 'f3', name: 'Dal (Lentil Soup)', category: 'Lentils', caloriesPer100g: 116 },
    { id: 'f4', name: 'Fried Fish', category: 'Fish', caloriesPer100g: 200 },
    { id: 'f5', name: 'Vegetable Curry', category: 'Veg', caloriesPer100g: 60 },
    { id: 'f6', name: 'Shak Bhaji (Leafy Greens)', category: 'Veg', caloriesPer100g: 80 },
    { id: 'f7', name: 'Chicken Curry', category: 'Meat', caloriesPer100g: 180 },
    { id: 'f8', name: 'Boiled Egg', category: 'Egg', caloriesPer100g: 155 },
    { id: 'f9', name: 'Khichuri', category: 'Rice', caloriesPer100g: 180 },
    { id: 'f10', name: 'Chicken Biryani', category: 'Rice', caloriesPer100g: 250 }
];

// --- Daily Food Log State ---
let dailyFoodLog = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
};

// --- Initialization ---
function init() {
    loadFoodLog();
    populateFoodSelector();
    renderFoodLog();
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
    
    // Default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select Food --';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);
    
    // Sort food alphabetically
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
    
    // Reset inputs
    const select = document.getElementById('food-select-input');
    if (select) select.selectedIndex = 0;
    
    const gramsInput = document.getElementById('food-grams-input');
    if (gramsInput) gramsInput.value = '';
    
    // Update title
    const titleMap = {
        'breakfast': 'Breakfast',
        'lunch': 'Lunch',
        'dinner': 'Dinner',
        'snacks': 'Snacks'
    };
    document.getElementById('food-selector-title').textContent = `Add to ${titleMap[mealType]}`;
    
    // Show modal
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
    
    // Calculate calories: (caloriesPer100g * grams) / 100
    const calculatedCalories = (food.caloriesPer100g * grams) / 100;
    
    const newEntry = {
        id: Date.now().toString(), // Simple unique ID
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

// Close dropdown if clicked outside
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
        // TODO (Supabase): Implement real sign-out here.
        // await supabase.auth.signOut();
        navigate('login-screen');
    } else {
        navigate(action);
    }
}

// --- Auth & Profile Frontend Stubs ---

function initiateLogin(event) {
    event.preventDefault();
    // TODO (Supabase): Implement real sign-in here.
    // const email = document.getElementById('login-email').value;
    // const password = document.getElementById('login-password').value;
    // const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    // For UI testing only: transition to home
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

    // TODO (Supabase): Implement real sign-up here.
    // const email = document.getElementById('signup-email').value;
    // const { error } = await supabase.auth.signUp({ email, password });
    
    // For UI testing only: transition to profile setup
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

function completeProfile(event) {
    event.preventDefault();
    
    // Trigger age check one more time on submit just in case
    checkAgeNotice();
    
    // TODO (Supabase): Save profile data to Supabase 'profiles' table.
    // const name = document.getElementById('profile-name').value;
    // const age = document.getElementById('profile-age').value;
    // const gender = document.getElementById('profile-gender').value;
    // const height = document.getElementById('profile-height').value;
    // const weight = document.getElementById('profile-weight').value;
    
    // For UI testing only: transition to home
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
