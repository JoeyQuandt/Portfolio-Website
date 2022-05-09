/*AOS Animation*/
AOS.init({
  duration: 1200,
});

/*Skill bar*/
$(".skills").addClass("active");
$(".skills .skill .skill-bar span").each(function () {
  $(this).animate(
    {
      width: $(this).parent().attr("data-bar") + "%",
    },
    1000
  );
  $(this).append("<b>" + $(this).parent().attr("data-bar") + "%</b>");
});
setTimeout(function () {
  $(".skills .skill .skill-bar span b").animate({ opacity: "1" }, 1000);
}, 2000);

//Navigation Bar color change//
window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  let windowPosition = window.scrollY > 0;

  header.classList.toggle("scrolling-active", windowPosition);
});

/*Hamburger Section*/
const nav = document.querySelector(".nav-links");
const burger = document.querySelector(".burger");
const links = nav.querySelectorAll("a");

burger.addEventListener("click", () => {
  nav.classList.toggle("nav-open");
  burger.classList.toggle("toggle");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    burger.classList.toggle("toggle");
  });
});

/*Header Type Animation*/
const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

//Type Method
TypeWriter.prototype.type = function () {
  //Current index of word
  const current = this.wordIndex % this.words.length;
  // Get full text of current word
  const fullTxt = this.words[current];

  //Check if deleting
  if (this.isDeleting) {
    //Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //Initial Type Speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    //Make pause at end
    typeSpeed = this.wait;
    // Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //Move to next word
    this.wordIndex++;
    //Pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

//Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

//Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  //Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// name of root element
const rootComponentName = "tabbed-component";

// define object storing classnames
const classes = {
  container: rootComponentName,
  buttonList: `${rootComponentName}__list`,
  buttonContainer: `${rootComponentName}__item`,
  buttonActive: `${rootComponentName}__item--active`,
  button: `${rootComponentName}__button`,

  sectionContainer: `${rootComponentName}__container`,
  section: `${rootComponentName}__section`,
  sectionActive: `${rootComponentName}__section--active`,
};

// propagate event listener to button container to prevent x seperate functions to each of the buttons
document
  .querySelector(`.${classes.buttonList}`)
  .addEventListener("click", (e) => {
    // if the click event was on one of the buttons (not the container outside)
    const el = e.target.closest(`.${classes.buttonContainer}`);

    // return if something other than the button is clicked
    if (!el) return;

    // store data in data-section="" html attribute
    let id = el.dataset.section;

    // return if tabbed selection already has the section
    if (
      document
        .getElementById(`section-${id}`)
        .classList.contains(classes.sectionActive)
    )
      return;

    // query the DOM to find all buttons and remove active button
    let buttons = document.querySelectorAll(`.${classes.buttonContainer}`);
    removeClassFromNodeList(buttons, classes.buttonActive);

    // add the active class to the new button from event
    el.classList.toggle(classes.buttonActive);

    // store all sections in a node list
    let sections = document.querySelectorAll(`.${classes.section}`);
    removeClassFromNodeList(sections, classes.sectionActive);

    // add active class to section from dataset of button clicked
    document
      .getElementById(`section-${id}`)
      .classList.add(classes.sectionActive);

    console.log(id);
  });

// function to accept a nodelist and class, and  loop through the list to remove html class from all nodes
const removeClassFromNodeList = (nodeList, className) => {
  nodeList.forEach((cur) => {
    cur.classList.remove(className);
  });
};
