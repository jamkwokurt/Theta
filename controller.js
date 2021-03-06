var input = document.getElementById("myFile");
var output = document.getElementById("output");
var showDay = document.getElementById("showDay");
let day;
const updateButton = () => {
    const button = document.getElementById("showDay");
    button.disabled = false;
}
input.onclick = function () { readTextFile() };
function readTextFile() {
    var myFile = new XMLHttpRequest();
    myFile.open("GET", 'weather.txt', false);
    myFile.onreadystatechange = function () {
        if (myFile.readyState === 4) {
            if (myFile.status === 200 || rawFile.status == 0) {
                var allText = myFile.responseText;
                output.innerHTML = allText;
                updateButton();
                var collection = document.getElementsByTagName("pre");
                //text from pre tag
                var text = collection[0].textContent
                var lines = text.split("\n");
                var entries = lines[2]
                //temp record of each day
                var values = lines.slice(4, 34)
                var array = new Array()
                for (let i = 0; i < values.length; i++) {
                    //trim whitespaces in a string
                    String.prototype.allTrim = String.prototype.allTrim ||
                        function () {
                            return this.replace(/\s+/g, ' ')
                                .replace(/^\s+|\s+$/, '');
                        };
                    var trim = values[i].allTrim()
                    //split string into substring array with a single whitespace as separator
                    var temps = trim.split(" ")
                    //parse max and min temprature as int and calculate difference
                    var diff = parseInt(temps[1].charAt(0) + temps[1].charAt(1)) - parseInt(temps[2].charAt(0) + temps[2].charAt(1))

                    array.push(diff)
                }
                //get the day number of smallest temp difference using index and Math object
                day = array.indexOf(Math.min(...array)) + 1;
            }
        }
    }
    myFile.send(null);
}
showDay.onclick = function () { printDay() };
function printDay() {
    console.log(day)
    document.getElementById("dayNumber").textContent = ": " + day
}
