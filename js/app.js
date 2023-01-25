let currentChoiceArray = {
    question1: '________',
    question2: '________',
    question3: '________',
    question4: '________',
    question5: '________'
}
const questions = document.body.querySelectorAll('[data-question]')
const choices = document.body.querySelectorAll('[data-item]')

const everyWeekElement = document.getElementById('card-every-week-price')
const every2WeeksElement = document.getElementById('card-every-2weeks-price')
const everyMonthElement = document.getElementById('card-every-month-price')

let weeklyPrice = 0.00
let biWeeklyPrice = 0.00
let monthlyPrice = 0.00

let totalPrice = 0.00

let allQuestionsAnswered = false

//General Event Listener
document.addEventListener('click', (event)=>{
    //For Mobile Hamburger Menu
    if(event.target.id === 'nav-dropdown'){
      handleDropdownMenu()
    }
})

questions.forEach(question =>{
    question.addEventListener('click', handleQuestion)
})
choices.forEach(choice =>{
    choice.addEventListener('click', handleChoices)
})

function handleDropdownMenu(){
    document.getElementById('nav-links').classList.toggle('hidden')
    if (!document.getElementById('nav-links').classList.contains('hidden')) {
        // Disable scroll
        document.body.style.overflow = "hidden";
    } else {
        // Enable scroll
        document.body.style.overflow = "auto";
    }

    document.getElementById('nav-dropdown').classList.toggle('nav-dropdown-opened')
}

function handleQuestion(event){
    const question = Number(event.currentTarget.dataset.question)
    const arrow = event.currentTarget.querySelector('svg')
    choices.forEach(choice =>{
        if(question === Number(choice.dataset.item)){
            choice.classList.toggle('card-hidden')
        }
    })
    //checks if element has an svg child element
    if(arrow){
        arrow.classList.toggle('arrow-rotate')
    }else{
        questions[question + 4].querySelector('svg').classList.toggle('arrow-rotate')
    }
}

function handleChoices(event){
    const currentItem = Number(event.currentTarget.dataset.item)
    const choiceStyle = event.currentTarget
    const currentChoice = event.currentTarget.dataset.choice
    
    if(currentItem === 1){
        currentChoiceArray.question1 = currentChoice
    }
    else if(currentItem === 2){
        currentChoiceArray.question2 = currentChoice
    }
    else if(currentItem === 3){
        currentChoiceArray.question3 = currentChoice
    }
    else if(currentItem === 4){
        currentChoiceArray.question4 = currentChoice
    }
    else if(currentItem === 5){
        currentChoiceArray.question5 = currentChoice
    }

    choices.forEach(choice =>{
        if(currentItem === Number(choice.dataset.item)){
            choice.classList.remove('card-active')
            choice.classList.add('card-hover')
        }
    })
    choiceStyle.classList.remove('card-hover')
    choiceStyle.classList.add('card-active')

    let summeryHtml = `
        <p class="fw-black">"I drink my coffee ${currentChoiceArray.question1 === "Capsules" ? "using" : "as"} 
        <span class="text-dark-cyan">${currentChoiceArray.question1}</span>, 
        with a <span class="text-dark-cyan">${currentChoiceArray.question2}</span> type bean. 
        <span class="text-dark-cyan">${currentChoiceArray.question3}</span> ${toGrindOrNotToGrind()} sent to me 
        <span class="text-dark-cyan">${currentChoiceArray.question5}</span>."
        </p>
    `
    document.getElementById('data-summery').innerHTML = summeryHtml
    document.getElementById('modal-data-summary').innerHTML = summeryHtml

    setPriceInfoToDOM()
    checkIfCapsuleIsSelected()
    createMyPlanBtn()
}

function toGrindOrNotToGrind(){
    if(currentChoiceArray.question1 === 'Capsules'){
        return ''
    }else{
        return `
            ground ala <span class="text-dark-cyan">${currentChoiceArray.question4}</span>,
        `
    }
}

function checkIfCapsuleIsSelected(){
    if(currentChoiceArray.question1 === 'Capsules'){
        currentChoiceArray.question4 = '________'
        questions[8].lastElementChild.classList.add('arrow-rotate')
        questions[3].classList.add('accordion-menu-disabled') //selects and styles the question on the left side in desktop view as disabled.
        questions[3].removeEventListener('click', handleQuestion)
        questions[8].classList.add('accordion-menu-disabled') //selects and styles the question at dropdown menu as disabled.
        questions[8].removeEventListener('click', handleQuestion)
        choices.forEach(choice=>{
            if(Number(choice.dataset.item) === 4){
                choice.classList.add('card-hidden')
                choice.classList.remove('card-active')
            }
        })
    }else{
        questions[3].classList.remove('accordion-menu-disabled')
        questions[3].addEventListener('click', handleQuestion)
        questions[8].classList.remove('accordion-menu-disabled') 
        questions[8].addEventListener('click', handleQuestion)
    }
}

function setPriceInfoToDOM(){
    if(currentChoiceArray.question3 === '250g'){
        weeklyPrice = 7.20
        biWeeklyPrice = 9.60
        monthlyPrice = 12.00
    }
    else if(currentChoiceArray.question3 === '500g'){
        weeklyPrice = 13.00
        biWeeklyPrice = 17.50
        monthlyPrice = 22.00
    }else{
        weeklyPrice = 22.00
        biWeeklyPrice = 32.00
        monthlyPrice = 42.00
    }
    everyWeekElement.innerText=`$${weeklyPrice.toFixed(2)} per shipment. Includes free first-class shipping.`
    every2WeeksElement.innerText=`$${biWeeklyPrice.toFixed(2)} per shipment. Includes free priority shipping.`
    everyMonthElement.innerText=`$${monthlyPrice.toFixed(2)} per shipment. Includes free priority shipping.`
}

function checkIfAllQuestionsAnswered(){
    const {question1, question2, question3, question4, question5} = currentChoiceArray
    if(question1 === 'Capsules'){
        if(question2 !== '________' && question3 !== '________' && question5 !== '________'){
            return true
        }
    }else{
        if(question1 !== '________' && question2 !== '________' && question3 !== '________' && question4 !== '________' && question5 !== '________'){
            return true
        }
    }
}

function createMyPlanBtn(){
    const createPlanBtn = document.getElementById('create-plan')
    const checkoutModal = document.getElementById('checkout-modal')
    const checkoutModalBg = document.getElementById('checkout-modal-bg')

    if(checkIfAllQuestionsAnswered()){
        createPlanBtn.classList.remove('btn-disabled')
        createPlanBtn.addEventListener('click', ()=>{
            checkoutModal.classList.remove('modal-hidden')
            checkoutModalBg.classList.remove('modal-hidden')
            calculateTotalPrice()
        })
        checkoutModalBg.addEventListener('click', ()=>{
            checkoutModal.classList.add('modal-hidden')
            checkoutModalBg.classList.add('modal-hidden')
        })
    }
}

function calculateTotalPrice(){
    const totalPriceElement = document.getElementById('total-price-p')
    if(currentChoiceArray.question5 === 'Every week'){
        totalPrice = weeklyPrice * 4
    }
    else if(currentChoiceArray.question5 === 'Every 2 weeks'){
        totalPrice = biWeeklyPrice * 2
    }else{
        totalPrice = monthlyPrice
    }
    totalPriceElement.innerText = `$${totalPrice.toFixed(2)} / mo `
}