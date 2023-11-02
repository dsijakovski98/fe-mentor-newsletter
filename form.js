const dashboard = document.querySelector(".dashboard");
const thankYou = document.querySelector(".thank-you");

const form = document.querySelector("form");
const emailInput = form.querySelector("input");

const validation = {
	email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

let errorDetected = false;

const clearErrors = () => {
	errorDetected = false;

	emailInput.removeAttribute("aria-invalid");
	form.querySelector(".error")?.remove();
};

const addError = (msg) => {
	errorDetected = true;

	emailInput.setAttribute("aria-invalid", "true");

	const errorP = document.createElement("p");
	errorP.className = "error";
	errorP.textContent = msg;

	emailInput.before(errorP);
};

thankYou.querySelector("button").addEventListener("click", () => {
	dashboard.style.display = "grid";
	thankYou.style.display = "none";
});

form.addEventListener("submit", (e) => {
	e.preventDefault();

	clearErrors();

	if (emailInput.value.trim() === "") {
		addError("Email cannot be empty");
	} else if (!validation.email.test(emailInput.value.trim())) {
		addError("Valid email required");
	}

	if (errorDetected) return;

	thankYou.querySelector(".user-email").textContent = emailInput.value.trim();
	form.reset();

	dashboard.style.display = "none";
	thankYou.style.display = "grid";
});
