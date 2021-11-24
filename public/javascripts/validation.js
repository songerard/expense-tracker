(function () {
  'use strict';
  window.addEventListener('load', function () {
    const datePickerValidationFailMsg = document.createElement('div');
    datePickerValidationFailMsg.classList.add('invalid-feedback');
    datePickerValidationFailMsg.innerText = '請選取日期';

    const dateInput = document.querySelector('.input-group-append')
    dateInput.after(datePickerValidationFailMsg)

    const datePicker = document.querySelector('#datepicker');

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {

        const dateValidity = isValidDate(datePicker.value);

        // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
        function isValidDate(dateString) {
          // First check for the pattern
          if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;

          // Parse the date parts to integers
          var parts = dateString.split("/");
          var day = parseInt(parts[1], 10);
          var month = parseInt(parts[0], 10);
          var year = parseInt(parts[2], 10);

          // Check the ranges of month and year
          if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

          var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

          // Adjust for leap years
          if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

          // Check the range of the day
          return day > 0 && day <= monthLength[month - 1];
        };


        console.log(dateValidity)
        if (form.checkValidity() === false || dateValidity === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();