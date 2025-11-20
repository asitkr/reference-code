import React, { useEffect, useRef, useState } from "react";

/**
 * Editor - Rich text editor component using contentEditable and document.execCommand.
 * Requires Tailwind CSS in the project.
 */
export default function Editor() {
  const editorRef = useRef(null);
  const [submittedContent, setSubmittedContent] = useState("");
  const [activeFormats, setActiveFormats] = useState(new Set());
  const [currentColor, setCurrentColor] = useState("#000000");

  // Wrapper to run execCommand safely and re-focus editor
  const cmd = (command, value = null) => {
    try {
      document.execCommand(command, false, value);
    } catch (e) {
      // Some browsers may throw for deprecated commands; fallback handled where needed.
      console.warn("execCommand failed:", command, e);
    }
    if (editorRef.current) editorRef.current.focus();
    updateActiveFormats();
  };

  // Update active format state (bold/italic/underline etc.)
  const updateActiveFormats = () => {
    const fm = new Set();
    try {
      if (document.queryCommandState("bold")) fm.add("bold");
      if (document.queryCommandState("italic")) fm.add("italic");
      if (document.queryCommandState("underline")) fm.add("underline");
      if (document.queryCommandState("strikeThrough")) fm.add("strike");
      // lists
      if (document.queryCommandState("insertUnorderedList")) fm.add("ul");
      if (document.queryCommandState("insertOrderedList")) fm.add("ol");
    } catch (e) {
      // ignore if browser doesn't support queryCommandState
      console.warn("queryCommandState failed:", e);
    }
    setActiveFormats(fm);
  };

  useEffect(() => {
    // update formats when selection changes
    document.addEventListener("selectionchange", updateActiveFormats);
    return () => document.removeEventListener("selectionchange", updateActiveFormats);
  }, []);

  // Paste handler: images, HTML (tables), or plain text
  const handlePaste = (e) => {
    e.preventDefault();
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          const reader = new FileReader();
          reader.onload = (ev) => {
            cmd("insertHTML", `<img src="${ev.target.result}" style="max-width:100%;height:auto;border-radius:6px;margin:8px 0;" />`);
          };
          reader.readAsDataURL(blob);
          return;
        }
      }
    }

    const html = e.clipboardData?.getData("text/html");
    if (html) {
      // basic cleanup - remove meta/style tags
      const clean = html.replace(/<meta[^>]*>/gi, "").replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
      cmd("insertHTML", clean);
    } else {
      const text = e.clipboardData?.getData("text/plain") || "";
      cmd("insertText", text);
    }
  };

  // Insert helpers
  const insertImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) cmd("insertHTML", `<img src="${url}" style="max-width:100%;height:auto;border-radius:6px;margin:8px 0;" />`);
  };

  const insertLink = () => {
    const url = window.prompt("Enter link URL (include https://):");
    if (!url) return;
    const sel = document.getSelection();
    const selectedText = sel && sel.toString() ? sel.toString() : url;
    cmd("insertHTML", `<a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText}</a>`);
  };

  const insertTable = () => {
    const rows = parseInt(window.prompt("Rows:", "3"), 10) || 0;
    const cols = parseInt(window.prompt("Columns:", "3"), 10) || 0;
    if (!rows || !cols) return;
    let table = `<table class="w-full my-3 border-collapse" style="border-collapse:collapse">`;
    for (let r = 0; r < rows; r++) {
      table += "<tr>";
      for (let c = 0; c < cols; c++) {
        table += `<td style="border:1px solid #ddd;padding:8px">Cell</td>`;
      }
      table += "</tr>";
    }
    table += "</table>";
    cmd("insertHTML", table);
  };

  const insertCodeBlock = () => {
    const code = window.prompt("Enter code:");
    if (!code) return;
    const block = `<pre style="background:#f4f4f4;padding:12px;border-radius:6px;overflow:auto;"><code>${escapeHtml(code)}</code></pre>`;
    cmd("insertHTML", block);
  };

  const insertBlockquote = () => {
    // Use formatBlock or wrap selection
    try {
      cmd("formatBlock", "blockquote");
    } catch {
      // fallback: wrap selection with blockquote
      wrapSelectionWithTag("blockquote");
    }
  };

  // Formatting helpers
  const applyHeading = (level) => {
    // Some browsers require tag without <>, others with. Try both.
    try {
      cmd("formatBlock", `H${level}`);
    } catch {
      try {
        cmd("formatBlock", `<h${level}>`);
      } catch {
        // fallback: wrap selection
        wrapSelectionWithTag(`h${level}`);
      }
    }
  };

  const setTextColor = (color) => {
    setCurrentColor(color);
    cmd("foreColor", color);
  };

  // Wrap current selection with a tag (span/h1/etc)
  const wrapSelectionWithTag = (tag, attributes = "") => {
    const sel = document.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const content = range.cloneContents();
    const div = document.createElement("div");
    div.appendChild(content);
    const inner = div.innerHTML || "";
    const newHtml = `<${tag} ${attributes}>${inner || ""}</${tag}>`;
    cmd("insertHTML", newHtml);
  };

  // Span button: prompt for class or inline style
  const wrapSelectionInSpan = () => {
    const className = window.prompt("Enter class(es) for <span> (optional):", "");
    const style = window.prompt("Enter inline style (optional, e.g. color:red; font-weight:bold;):", "");
    const attrs = `${className ? `class="${className}"` : ""} ${style ? `style="${style}"` : ""}`.trim();
    wrapSelectionWithTag("span", attrs);
  };

  // Utilities
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  const handleSubmit = () => {
    if (editorRef.current) setSubmittedContent(editorRef.current.innerHTML);
  };

  const copyToClipboard = async () => {
    try {
      const html = editorRef.current?.innerHTML || "";
      await navigator.clipboard.writeText(html);
      alert("HTML copied to clipboard!");
    } catch (e) {
      alert("Copy failed: " + e?.message);
    }
  };

  const downloadHTML = () => {
    const html = editorRef.current?.innerHTML || "";
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearEditor = () => {
    if (window.confirm("Clear all content?")) {
      if (editorRef.current) editorRef.current.innerHTML = "";
      setSubmittedContent("");
    }
  };

  // Ensure editor is focusable and has placeholder behavior
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-600 to-purple-700 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center text-white mb-6">
          <h1 className="text-3xl font-bold drop-shadow-md">✨ Rich Text Editor</h1>
          <p className="text-sm opacity-90 mt-1">Create beautiful formatted content</p>
        </header>

        {/* Toolbar */}
        <div className="bg-white rounded-t-xl p-3 shadow-md flex flex-wrap gap-2 items-center">
          {/* Undo / Redo */}
          <div className="flex gap-1">
            <ToolbarBtn onClick={() => cmd("undo")}>Undo</ToolbarBtn>
            <ToolbarBtn onClick={() => cmd("redo")}>Redo</ToolbarBtn>
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2" />

          {/* Text styles */}
          <div className="flex gap-1">
            <ToolbarBtn active={activeFormats.has("bold")} onClick={() => cmd("bold")}>
              B
            </ToolbarBtn>
            <ToolbarBtn active={activeFormats.has("italic")} onClick={() => cmd("italic")}>
              I
            </ToolbarBtn>
            <ToolbarBtn active={activeFormats.has("underline")} onClick={() => cmd("underline")}>
              U
            </ToolbarBtn>
            <ToolbarBtn active={activeFormats.has("strike")} onClick={() => cmd("strikeThrough")}>
              S
            </ToolbarBtn>
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2" />

          {/* Headings */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <ToolbarBtn key={n} onClick={() => applyHeading(n)}>
                H{n}
              </ToolbarBtn>
            ))}
            <ToolbarBtn onClick={() => cmd("formatBlock", "p")}>P</ToolbarBtn>
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2" />

          {/* Color */}
          <div className="flex items-center gap-1">
            <input
              title="Text color"
              type="color"
              value={currentColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-8 h-8 p-0 border-0"
            />
            <span className="text-xs text-gray-600">Text Color</span>
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2" />

          {/* Alignment */}
          <div className="flex gap-1">
            <ToolbarBtn onClick={() => cmd("justifyLeft")}>Left</ToolbarBtn>
            <ToolbarBtn onClick={() => cmd("justifyCenter")}>Center</ToolbarBtn>
            <ToolbarBtn onClick={() => cmd("justifyRight")}>Right</ToolbarBtn>
            <ToolbarBtn onClick={() => cmd("justifyFull")}>Justify</ToolbarBtn>
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2" />

          {/* Lists & quote */}
          <div className="flex gap-1">
            <ToolbarBtn active={activeFormats.has("ul")} onClick={() => cmd("insertUnorderedList")}>
              • UL
            </ToolbarBtn>
            <ToolbarBtn active={activeFormats.has("ol")} onClick={() => cmd("insertOrderedList")}>
              1. OL
            </ToolbarBtn>
            <ToolbarBtn onClick={insertBlockquote}>❝ Quote</ToolbarBtn>
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2" />

          {/* Insert */}
          <div className="flex gap-1">
            <ToolbarBtn onClick={insertLink}>Link</ToolbarBtn>
            <ToolbarBtn onClick={insertImage}>Image</ToolbarBtn>
            <ToolbarBtn onClick={insertTable}>Table</ToolbarBtn>
            <ToolbarBtn onClick={insertCodeBlock}>Code</ToolbarBtn>
            <ToolbarBtn onClick={wrapSelectionInSpan}>Span</ToolbarBtn>
          </div>

          <div className="h-6 w-px bg-gray-200 mx-2" />

          <div className="flex gap-1 ml-auto">
            <ToolbarBtn onClick={() => cmd("removeFormat")}>Clear Format</ToolbarBtn>
          </div>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          onPaste={handlePaste}
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          contentEditable
          suppressContentEditableWarning
          className="editor bg-white p-6 min-h-[300px] rounded-b-xl shadow-md mt-0 focus:outline-none"
          // placeholder effect: when empty show message via css pseudo isn't directly available, so show via data-attr:
          data-placeholder="Start typing here... (you can paste images)"
          style={{
            minHeight: "360px",
          }}
        >
          {/* Optionally seed editor with sample content */}
          <p className="text-gray-700">Start typing your content here... (You can paste images directly!)</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold">
            Submit & Preview
          </button>
          <button onClick={copyToClipboard} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800">
            Copy HTML
          </button>
          <button onClick={downloadHTML} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800">
            Download
          </button>
          <button onClick={clearEditor} className="px-3 py-2 rounded-md bg-red-100 text-red-700">
            Clear All
          </button>
        </div>

        {/* Preview */}
        {submittedContent ? (
          <div className="bg-white rounded-xl p-6 mt-6 shadow-md">
            <h3 className="text-lg font-semibold mb-3">📄 Preview</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: submittedContent }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* Small presentational button component used in toolbar */
function ToolbarBtn({ children, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`px-2 py-1 rounded-md text-sm border ${
        active ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-200"
      } hover:shadow-sm`}
    >
      {children}
    </button>
  );
}
