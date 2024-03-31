document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('surveyForm');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = new FormData(form);
      const entries = Array.from(formData.entries());
      const dataObject = Object.fromEntries(entries);
  
      let surveyData = JSON.parse(localStorage.getItem('surveyData')) || [];
      surveyData.push(dataObject);
      localStorage.setItem('surveyData', JSON.stringify(surveyData));
  
      form.reset();
    });
  
    const filterByKeySkillsButton = document.getElementById('filterByKeySkillsButton');
    const filterByEducationButton = document.getElementById('filterByEducationButton');
    const filterByAvailabilityButton = document.getElementById('filterByAvailabilityButton');
    const resultsContainer = document.getElementById('filterResults');
  
    // Функція для виведення результатів за ключовими навичками
    filterByKeySkillsButton.addEventListener('click', function() {
      const surveyData = JSON.parse(localStorage.getItem('surveyData')) || [];
      const filteredByKeySkills = surveyData.filter(item => item.keySkills && item.keySkills.includes('JavaScript')); 
      displayResults(filteredByKeySkills, 'Результати за ключовими навичками (JavaScript):');
    });
  
    // Функція для виведення результатів за освітою та кваліфікацією
    filterByEducationButton.addEventListener('click', function() {
      const surveyData = JSON.parse(localStorage.getItem('surveyData')) || [];
      const filteredByEducation = surveyData.filter(item => item.education && item.education.includes('Computer Science')); 
      displayResults(filteredByEducation, 'Результати за освітою та кваліфікацією (Computer Science):');
    });
  
    // Функція для виведення результатів за доступністю для роботи
    filterByAvailabilityButton.addEventListener('click', function() {
      const surveyData = JSON.parse(localStorage.getItem('surveyData')) || [];
      const filteredByAvailability = surveyData.filter(item => item.availability && item.availability === 'immediately'); 
      displayResults(filteredByAvailability, 'Результати за доступністю для роботи (негайно):');
    });
  
    // Функція для відображення результатів
    function displayResults(filteredData, filterName) {
      resultsContainer.innerHTML = ''; 
      const resultList = document.createElement('ul');
      resultList.innerHTML = `<strong>${filterName}</strong>`;
      if (filteredData.length > 0) {
        filteredData.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = JSON.stringify(item);
          resultList.appendChild(listItem);
        });
      } else {
        const listItem = document.createElement('li');
        listItem.textContent = 'Немає результатів для відображення за обраним фільтром.';
        resultList.appendChild(listItem);
      }
      resultsContainer.appendChild(resultList);
    }
  });
