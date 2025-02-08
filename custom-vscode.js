document.addEventListener('DOMContentLoaded', function() {
    const checkElement = setInterval(() => {
        const commandDialog = document.querySelector(".quick-input-widget");
        if (commandDialog) {
          if (commandDialog.style.display !== "none") {
            runMyScript();
          }
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        if (commandDialog.style.display === 'none') {
                            handleEscape();
                        } else {
                            runMyScript();
                        }
                    }
                });
            });

            observer.observe(commandDialog, { attributes: true });
            clearInterval(checkElement);
        } else {
            console.log("Command dialog not found yet. Retrying...");
        }
    }, 500);

    document.addEventListener('keydown', function(event) {
        if ((event.metaKey || event.ctrlKey) && event.key === 'p') {
            event.preventDefault();
            runMyScript();
        } else if (event.key === 'Escape' || event.key === 'Esc') {
            event.preventDefault();
            handleEscape();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            handleEscape();
        }
    }, true);

    function runMyScript() {

        const targetDiv = document.querySelector(".monaco-workbench");
        const existingElement = document.getElementById("command-blur");
        if (existingElement) {
            existingElement.remove();
        }

        const newElement = document.createElement("div");
        newElement.setAttribute('id', 'command-blur');

        newElement.addEventListener('click', function() {
            newElement.remove();
        });

        targetDiv.appendChild(newElement);
    }

    function handleEscape() {
        const element = document.getElementById("command-blur");
        if (element) {
            element.click();
        }
    }
});
