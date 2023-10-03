const button = document.getElementById("button");
button.addEventListener("click", async function () {
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            function onDOMReady() {
                const emailRegEx = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/g;

                const emails = document.body.innerHTML.match(emailRegEx);

                // Now you can use 'emails' to work with the matched email addresses
                if (emails) {
                    alert(emails);
                } else {
                    alert("No email addresses found on this page.");
                }
            }

            // Check if the DOM is already ready, and if not, wait for it
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", onDOMReady);
            } else {
                onDOMReady();
            }
        },
    })
})




