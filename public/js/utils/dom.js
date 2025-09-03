// Este archivo contiene funciones utilitarias para manipulación del DOM.

function getElement(selector) {
    return document.querySelector(selector);
}

function getAllElements(selector) {
    return document.querySelectorAll(selector);
}

function createElement(tag, className = '', textContent = '') {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

function appendElement(parent, child) {
    parent.appendChild(child);
}

function removeElement(element) {
    if (element) {
        element.parentNode.removeChild(element);
    }
}

function setElementText(element, text) {
    if (element) {
        element.textContent = text;
    }
}

function setElementAttribute(element, attribute, value) {
    if (element) {
        element.setAttribute(attribute, value);
    }
}

function addEventListenerToElement(element, event, callback) {
    if (element) {
        element.addEventListener(event, callback);
    }
}