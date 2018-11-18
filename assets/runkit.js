(function () {
    if (window.NodeList && !NodeList.prototype.forEach)
        NodeList.prototype.forEach = Array.prototype.forEach;

    var runnables = document.querySelectorAll(".runkit");

    if (runnables.length <= 0)
        return;

    var script = document.createElement("script");
    
    script.onload = function () {
        runnables.forEach(function (runnable) {
            var replace = runnable.parentNode;
            var wrapper = document.createElement('div');
            wrapper.style.position = 'absolute';
            wrapper.style.top = '0';
            wrapper.style.left = '-9999px';
            wrapper.className = 'runkit-wrapper';
            replace.parentNode.insertBefore(wrapper, replace);
            RunKit.createNotebook({
                element: wrapper,
                minHeight: '0px',
                source: RunKit.sourceFromElement(replace),
                onLoad: function(notebook) {
                    for (var i = replace.childNodes.length - 1; i >= 0; i--) {
                        if (replace.childNodes[i].className !== 'runkit-wrapper') {
                            replace.parentNode.removeChild(replace);
                        }
                    }
                    wrapper.style.cssText = 'margin: 1rem;';
                    notebook.evaluate();
                },
            });
        });
    }

    script.src = "https://embed.runkit.com";

    document.body.append(script);
})();
