import ChordSheetJS from "https://cdn.jsdelivr.net/npm/chordsheetjs@12.3.1/+esm";
function render(s, target) {
  const parser = new ChordSheetJS.ChordProParser();
  const song = parser.parse(s);
  document.title = song.title;
  const formatter = new ChordSheetJS.HtmlDivFormatter({
    normalizeChords: false,
    useUnicodeModifiers: true,
  });
  target.innerHTML = formatter.format(song);
  const replaceEntries = [
    [/Maj|maj|M/g, "\uE18A"],
    [/(.+)(\(.+?\))/g, "$1<sup>$2</sup>"],
    [/^([^\(]+)([-+][59]|omit[35])/g, "$1<sup>$2</sup>"],
  ];
  target.querySelectorAll(".chord,.annotation").forEach((chord) => {
    for (const [from, to] of replaceEntries) {
      chord.innerHTML = chord.innerHTML.replaceAll(from, to);
    }
  });
}
const $ = (s) => document.querySelector(s);
const target = $("main");
const saved = localStorage.getItem("chordpro");
if (saved) {
  $("textarea").value = saved;
  render(saved, target);
}
$("textarea").onchange = (e) => {
  const s = e.target.value;
  if (s) {
    render(s, target);
  }
  localStorage.setItem("chordpro", s);
};
$("button").onclick = () => {
  print();
};
