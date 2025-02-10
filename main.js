import ChordPro from "https://cdn.jsdelivr.net/npm/chordproject-parser@0.2.14/+esm";
function render(s, target) {
  const parser = new ChordPro.ChordProParser();
  const song = parser.parse(s);
  document.title = song.title;
  const formatter = new ChordPro.HtmlFormatter();
  const htmlTags = formatter.format(song);
  target.innerHTML = htmlTags.join("\n");
  const replaceEntries = [
    [/Maj|maj|M/g, "\uE18A"],
    ["b", "\u266D"],
    ["#", "\u266F"],
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
