const RunningSushiHelper = {};

RunningSushiHelper.SushiHelper = function () {
    this.count = 0;
    this.record = 0;
    this.lastButtonClickTime = 0;

};

RunningSushiHelper.SushiHelper.prototype = {
    initialize: function () {
        const sushiBtn = document.getElementById("sushiBtn");
        const sweetBtn = document.getElementById("sweetBtn");
        const saltyBtn = document.getElementById("saltyBtn");
        const popUpPlace = document.getElementById('popUpPlace');


        const platesCount = document.getElementById("platesCount");
        const highestRecord = document.getElementById("highestRecord");
        const strategyAlert = document.getElementById("strategyAlert");

        const WeightInput = document.getElementById("WeightInput");
        const heightInput = document.getElementById("heightInput");
        const submitBtn = document.getElementById("submitBtn");
        
        const savedData = localStorage.getItem("sushiHelperData");

        if (savedData) {
            const { record } = JSON.parse(savedData);
            this.record = record;
            this.updateRecord();
        }

        


        sushiBtn.addEventListener("click", () => {
            this.count++;
            this.updateCounter();
            this.checkStrategy();
            document.getElementById('myAudiobite').play();
        });

        submitBtn.addEventListener("click", () => {
            const Weight = WeightInput.value;
            const height = heightInput.value;
            if (Weight < 30 || height < 30 || Weight > 500 || height > 250) {
                const popup = document.createElement("div");
                popup.classList.add("popup");
                popup.textContent = "Please enter your real weight and height";
                popUpPlace.appendChild(popup);
                document.getElementById('myAudioerror').play();
                setTimeout(() => {
                    popUpPlace.removeChild(popup);
                }, 5000);
                return;
            } else {
                const bmi = Weight / ((height / 100) * (height / 100));

                document.getElementById('bottomText').textContent = "Your BMI is " + bmi.toFixed(2) + " start eating!";
                const popup = document.createElement("div");
                popup.classList.add("popup");
                popup.textContent = "Eat up!";


                popUpPlace.appendChild(popup);


                document.getElementById('myAudiobell').play();


                setTimeout(() => {
                    popUpPlace.removeChild(popup);
                }, 5000);
                setInterval(() => {
                    const popup = document.createElement("div");
                    popup.classList.add("popup");
                    popup.textContent = "Eat up!";

                    popUpPlace.appendChild(popup);


                    document.getElementById('myAudiobell').play();


                    setTimeout(() => {
                        popUpPlace.removeChild(popup);
                    }, 5000);

                }, 5000 * 5 * bmi / 10);
            }
        });

        sweetBtn.addEventListener("click", () => {
            this.count++;
            this.updateCounter();
            this.checkStrategy();
            document.getElementById('myAudiosweet').play();
        });

        saltyBtn.addEventListener("click", () => {
            this.count++;
            this.updateCounter();
            this.checkStrategy();
            document.getElementById('myAudiosalty').play();
        });

        window.addEventListener("beforeunload", () => {
            const data = {record: this.record };
            localStorage.setItem("sushiHelperData", JSON.stringify(data));
        });

        window.addEventListener("popstate", () => {
            if(this.record == this.count){
                this.record--;
            }
            this.count--;
            this.updateCounter();
            this.updateRecord();
          });



        

    },

    updateCounter: function () {
        const platesCount = document.getElementById("platesCount");
        platesCount.textContent = this.count;
        history.pushState({ count: this.count, record: this.record }, null, null);


    },

    updateRecord: function () {
        const recordCount = document.getElementById("highestRecord");
        recordCount.textContent = this.record;

    },

    checkStrategy: function () {

        if (new Date().getTime() - this.lastButtonClickTime < 3000) {
            const popup = document.createElement("div");
            popup.classList.add("popup");
            popup.textContent = "Slow down!";

            popUpPlace.appendChild(popup);


            document.getElementById('myAudioerror').play();


            setTimeout(() => {
                popUpPlace.removeChild(popup);
            }, 3000);
        }

        this.lastButtonClickTime = new Date().getTime();

        const highestRecord = document.getElementById("highestRecord");
        const strategyAlert = document.getElementById("strategyAlert");

        if (this.count > this.record) {
            this.record = this.count;
            highestRecord.textContent = this.record;
        }

        
    }
};


window.addEventListener("resize", () => {
    const containerWidth = document.querySelector(".container").offsetWidth;
    const svgWidth = containerWidth / 3;
    const svgHeight = svgWidth;

    const svgs = document.querySelectorAll("svg");

    svgs.forEach((svg) => {
        svg.setAttribute("width", svgWidth);
        svg.setAttribute("height", svgHeight);
        const circle = svg.querySelector("circle");
        const centerX = svgWidth / 2;
        const centerY = svgHeight / 2;
        circle.setAttribute("cx", centerX);
        circle.setAttribute("cy", centerY);
    });
});

$(document).ready(function() {
    const toggleSwitch = $('<input>', { type: 'checkbox', id: 'darkModeToggle' });
  const toggleLabel = $('<label>', { for: 'darkModeToggle', text: 'Dark Mode' });
  const wrapperDiv = $('<div>', {id: 'darkModeDiv'}); 

  wrapperDiv.append(toggleSwitch, toggleLabel);

  $('body').append(wrapperDiv);

  function toggleDarkMode() {
    $('body').toggleClass('dark-mode');
  }

  $('#darkModeToggle').on('change', toggleDarkMode);
  });
const sushiHelper = new RunningSushiHelper.SushiHelper();
sushiHelper.initialize();
