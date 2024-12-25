function parseUIMS() {
    const input = document.getElementById('uims-input').value.trim();
    const rows = input.split('\n');
    const container = document.getElementById('course-container');
    container.innerHTML = ''; // Clear existing courses
  
    rows.forEach(row => {
      const cells = row.split('\t');
      if (cells.length >= 2) {
        const courseName = cells[0];
        const credits = cells[1];
  
        const courseDiv = createCourseDiv(courseName, credits);
        container.appendChild(courseDiv);
      }
    });
  }
  
  function addCourseManually() {
    const container = document.getElementById('course-container');
    const courseDiv = createCourseDiv('', '');
    container.appendChild(courseDiv);
  }
  
  function createCourseDiv(courseName = '', credits = '') {
    const div = document.createElement('div');
    div.classList.add('course');
    div.innerHTML = `
      <input type="text" value="${courseName}" placeholder="Course Name">
      <input type="number" value="${credits}" placeholder="Credits">
      <select>
        <option value="4">A+</option>
        <option value="3.7">A</option>
        <option value="3.3">B+</option>
        <option value="3">B</option>
        <option value="2.7">C+</option>
        <option value="2.3">C</option>
        <option value="2">D</option>
        <option value="0">F</option>
      </select>
    `;
    return div;
  }
  
  function calculateGPA() {
    const courses = document.querySelectorAll('.course');
    let totalPoints = 0;
    let totalCredits = 0;
  
    courses.forEach(course => {
      const credits = parseFloat(course.querySelector('input[type="number"]').value);
      const grade = parseFloat(course.querySelector('select').value);
      if (!isNaN(credits) && !isNaN(grade)) {
        totalPoints += credits * grade;
        totalCredits += credits;
      }
    });
  
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    document.getElementById('gpa-result').textContent = gpa;
  }
  
