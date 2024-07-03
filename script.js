function process() {
    var selectedOption = document.getElementById("cipherSelect").value;

    if (selectedOption === "sha256") {
        hashText();
    }
}

    //zyxwvutsrqponmlkjihgfedcba

function encrypt() {
    var cipherType = document.getElementById("cipherSelect").value;
    var inputText = document.getElementById("inputText").value;
    var key = document.getElementById("key").value;
    var outputElement = document.getElementById("output");

    // Perform encryption based on the selected cipher
    var result;
    switch (cipherType) {
        case "caesar":
            result = caesarEncrypt(inputText, key);
            break;
        case "vigenere":
            result = vigenereEncrypt(inputText, key);
            break;
            case "otp":
                result = otpEncrypt(inputText, key);
                break;
                case "rail":
    result = railEncrypt(inputText, key);
    break;
        case "Mono-Alphabetic":
            result = monoalphabeticEncrypt(inputText, key);
            break;
        default:
            result = "Invalid cipher type";
    }

    outputElement.textContent = result;
}

function decrypt() {
    var cipherType = document.getElementById("cipherSelect").value;
    var inputText = document.getElementById("inputText").value;
    var key = document.getElementById("key").value;
    var outputElement = document.getElementById("output");

    // Perform decryption based on the selected cipher
    var result;
    switch (cipherType) {
        case "caesar":
            result = caesarDecrypt(inputText, key);
            break;
        case "vigenere":
            result = vigenereDecrypt(inputText, key);
            break;
            case "otp":
                result = otpDecrypt(inputText, key);
                break;
                case "rail":
    result = railDecrypt(inputText, key);
    break;
        case "Mono-Alphabetic":
            result = monoalphabeticDecrypt(inputText, key);
            break;
        default:
            result = "Invalid cipher type";
    }

    outputElement.textContent = result;
}


// Implement cipher functions here (Caesar, Playfair, Vigenere, Transposition, OTP, Affine)
// ...
//Caesar Cipher:
function caesarEncrypt(text, key) {
    // Ensure key is a positive integer
    key = (key % 26 + 26) % 26;

    var result = "";
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) {  // Uppercase letters
            result += String.fromCharCode((charCode - 65 + key) % 26 + 65);
        } else if (charCode >= 97 && charCode <= 122) {  // Lowercase letters
            result += String.fromCharCode((charCode - 97 + key) % 26 + 97);
        } else {
            result += text[i];  // Non-alphabetic characters remain unchanged
        }
    }

    return "Caesar encryption: " + result;
}

function caesarDecrypt(text, key) {
// Ensure key is a positive integer
key = (key % 26 + 26) % 26;

var result = "";
for (var i = 0; i < text.length; i++) {
var charCode = text.charCodeAt(i);

if (charCode >= 65 && charCode <= 90) {  // Uppercase letters
result += String.fromCharCode((charCode - 65 + 26 - key) % 26 + 65);
} else if (charCode >= 97 && charCode <= 122) {  // Lowercase letters
result += String.fromCharCode((charCode - 97 + 26 - key) % 26 + 97);
} else {
result += text[i];  // Non-alphabetic characters remain unchanged
}
}

return "Caesar decryption: " + result;
}





// Vigenere Cipher
function vigenereEncrypt(plainText, key) {
// Ensure the key is repeated to match the length of the plaintext
key = key.repeat(Math.ceil(plainText.length / key.length)).toUpperCase();

var result = "";
for (var i = 0; i < plainText.length; i++) {
var charCode = plainText.charCodeAt(i);

if (charCode >= 65 && charCode <= 90) {  // Uppercase letters
    result += String.fromCharCode((charCode - 65 + (key.charCodeAt(i) - 65)) % 26 + 65);
} else if (charCode >= 97 && charCode <= 122) {  // Lowercase letters
    result += String.fromCharCode((charCode - 97 + (key.charCodeAt(i) - 65)) % 26 + 97);
} else {
    result += plainText[i];  // Non-alphabetic characters remain unchanged
}
}

return "Vigenere encryption: " + result;
}

// Vigenere Cipher Decryption
function vigenereDecrypt(cipherText, key) {
// Ensure the key is repeated to match the length of the ciphertext
key = key.repeat(Math.ceil(cipherText.length / key.length)).toUpperCase();

var result = "";
for (var i = 0; i < cipherText.length; i++) {
var charCode = cipherText.charCodeAt(i);

if (charCode >= 65 && charCode <= 90) {  // Uppercase letters
    result += String.fromCharCode((charCode - 65 - (key.charCodeAt(i) - 65) + 26) % 26 + 65);
} else if (charCode >= 97 && charCode <= 122) {  // Lowercase letters
    result += String.fromCharCode((charCode - 97 - (key.charCodeAt(i) - 65) + 26) % 26 + 97);
} else {
    result += cipherText[i];  // Non-alphabetic characters remain unchanged
}
}

return "Vigenere decryption: " + result;
}


// One-Time Pad (OTP) Encryption
function otpEncrypt(plainText, key) {
    // Ensure key is the same length as the plaintext
    if (key.length !== plainText.length) {
        return "Error: Key must have the same length as the plaintext.";
    }

    var encryptedText = "";
    for (var i = 0; i < plainText.length; i++) {
        var charCode = plainText.charCodeAt(i) ^ key.charCodeAt(i);
        encryptedText += String.fromCharCode(charCode);
    }

    return "One-Time Pad encryption: " + encryptedText;
}

// One-Time Pad (OTP) Decryption
function otpDecrypt(cipherText, key) {
    // Ensure key is the same length as the ciphertext
    if (key.length !== cipherText.length) {
        return "Error: Key must have the same length as the ciphertext.";
    }

    var decryptedText = "";
    for (var i = 0; i < cipherText.length; i++) {
        var charCode = cipherText.charCodeAt(i) ^ key.charCodeAt(i);
        decryptedText += String.fromCharCode(charCode);
    }

    return "One-Time Pad decryption: " + decryptedText;
}

// Add the following functions for Rail Fence Cipher encryption and decryption

// Rail Fence Cipher Encryption
function railEncrypt(plainText, key) {
    var rails = parseInt(key);

    if (isNaN(rails) || rails < 2) {
        return "Error: Invalid number of rails.";
    }

    var railArray = new Array(rails).fill("");
    var direction = 1;
    var railIndex = 0;

    for (var i = 0; i < plainText.length; i++) {
        railArray[railIndex] += plainText[i];

        if (railIndex === 0) {
            direction = 1;
        } else if (railIndex === rails - 1) {
            direction = -1;
        }

        railIndex += direction;
    }

    var encryptedText = railArray.join("");
    return "Rail Fence Cipher encryption: " + encryptedText;
}

// Rail Fence Cipher Decryption
function railDecrypt(cipherText, key) {
    var rails = parseInt(key);

    if (isNaN(rails) || rails < 2) {
        return "Error: Invalid number of rails.";
    }

    var railArray = new Array(rails).fill("");
    var direction = 1;
    var railIndex = 0;
    var charIndex = 0;

    for (var i = 0; i < cipherText.length; i++) {
        railArray[railIndex] += '*'; // Placeholder for encrypted characters

        if (railIndex === 0) {
            direction = 1;
        } else if (railIndex === rails - 1) {
            direction = -1;
        }

        railIndex += direction;
    }

    for (var j = 0; j < rails; j++) {
        for (var k = 0; k < railArray[j].length; k++) {
            railArray[j] = railArray[j].substring(0, k) + cipherText[charIndex++] + railArray[j].substring(k + 1);
        }
    }

    var decryptedText = "";
    railIndex = 0;
    direction = 1;

    for (var m = 0; m < cipherText.length; m++) {
        decryptedText += railArray[railIndex][0];
        railArray[railIndex] = railArray[railIndex].substring(1);

        if (railIndex === 0) {
            direction = 1;
        } else if (railIndex === rails - 1) {
            direction = -1;
        }

        railIndex += direction;
    }

    return "Rail Fence Cipher decryption: " + decryptedText;
}



//Mono-Alphabetic Cipher
function monoalphabeticEncrypt(inputText, key) {
// Ensure the key has 26 unique characters
if (key.length !== 26 || new Set(key).size !== 26) {
return "Error: Key must contain 26 unique characters.";
}

inputText = inputText.toLowerCase();
var cipherText = "";

for (var i = 0; i < inputText.length; i++) {
var char = inputText.charAt(i);

if (char >= 'a' && char <= 'z') {
    // Encrypt only alphabetic characters
    var index = char.charCodeAt(0) - 'a'.charCodeAt(0);
    cipherText += key.charAt(index);
} else {
    // Non-alphabetic characters remain unchanged
    cipherText += char;
}
}

return "Monoalphabetic encryption: " + cipherText;
}

function monoalphabeticDecrypt(inputText, key) {
// Ensure the key has 26 unique characters
if (key.length !== 26 || new Set(key).size !== 26) {
return "Error: Key must contain 26 unique characters.";
}

inputText = inputText.toLowerCase();
var decryptedText = "";

for (var i = 0; i < inputText.length; i++) {
var char = inputText.charAt(i);

if (char >= 'a' && char <= 'z') {
    // Decrypt only alphabetic characters
    var index = key.indexOf(char);
    decryptedText += String.fromCharCode('a'.charCodeAt(0) + index);
} else {
    // Non-alphabetic characters remain unchanged
    decryptedText += char;
}
}

return "Monoalphabetic decryption: " + decryptedText;
}

function hashText() {
    var inputText = document.getElementById("inputText").value;
    var outputElement = document.getElementById("output");

    // Use the Web Crypto API to compute SHA-256 hash
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(inputText))
        .then(hashBuffer => {
            var hashArray = Array.from(new Uint8Array(hashBuffer));
            var hashedText = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            outputElement.textContent = "SHA-256 Hash: " + hashedText;
        })
        .catch(error => console.error(error));
}