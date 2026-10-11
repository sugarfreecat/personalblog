document.addEventListener('DOMContentLoaded', function() {
    var textareas = document.querySelectorAll('textarea'); 
    
    if (textareas.length > 0) { 
        textareas.forEach(function(item) {
            // 1. Create a wrapper container for our side-by-side split screen
            var wrapper = document.createElement('div');
            wrapper.className = 'editor-preview-split';
            item.parentNode.insertBefore(wrapper, item);
            
            // 2. Build the live preview iframe element
            var previewFrame = document.createElement('iframe');
            previewFrame.className = 'editor-preview-window';
            
            // Move our textarea inside our split layout container
            wrapper.appendChild(item);
            wrapper.appendChild(previewFrame);

            // 3. Initialize CodeMirror
            var editor = CodeMirror.fromTextArea(item, {
                mode: "htmlmixed", 
                theme: "monokai",   
                lineNumbers: true,
                tabSize: 4,
                indentUnit: 4,
                matchBrackets: true,
                lineWrapping: true
            });
            
            // 4. Function to render code inside the preview iframe
            function updatePreview() {
                var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
                preview.open();
                preview.write(editor.getValue());
                preview.close();
            }

            // Fire preview on startup and update it instantly on every keystroke
            updatePreview();
            
            editor.on('change', function(cm) {
                cm.save(); // Save data to native textarea for Django
                updatePreview(); // Refresh preview frame
            });
        });
    }
});
