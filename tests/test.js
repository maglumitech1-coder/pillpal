// Run: node tests/test.js
const {D,I}=require("../js/data.js");
let fail=0;const ok=(c,m)=>{console.log((c?"PASS ":"FAIL ")+m);if(!c)fail++};
const seen=new Set();
I.forEach(([a,b,s])=>{
  ok(D[a]&&D[b],`known drugs: ${a} + ${b}`);
  ok(["major","moderate","minor"].includes(s),`valid severity: ${a} + ${b}`);
  const k=[a,b].sort().join("|");ok(!seen.has(k),`no duplicate pair: ${k}`);seen.add(k);
});
const has=(a,b)=>I.some(x=>(x[0]===a&&x[1]===b)||(x[0]===b&&x[1]===a));
[["warfarin","ibuprofen"],["sildenafil","nitroglycerin"],["sertraline","tramadol"],["oxycodone","alprazolam"]].forEach(p=>ok(has(...p),`detects known pair ${p.join(" + ")}`));
ok(!has("metformin","amlodipine"),"negative control: metformin + amlodipine not flagged");
console.log(`\n${Object.keys(D).length} drugs, ${I.length} interactions`);
process.exit(fail?1:0);
