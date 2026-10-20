// Sample dataset: general knowledge of widely documented interactions, for demonstration only.
// Verify against openFDA labels or DDInter before relying on it (see README).
const D={warfarin:["Warfarin","Coumadin"],ibuprofen:["Ibuprofen","Advil","Motrin"],aspirin:["Aspirin"],naproxen:["Naproxen","Aleve"],acetaminophen:["Acetaminophen","Paracetamol","Tylenol"],lisinopril:["Lisinopril"],spironolactone:["Spironolactone"],sildenafil:["Sildenafil","Viagra"],nitroglycerin:["Nitroglycerin"],simvastatin:["Simvastatin","Zocor"],atorvastatin:["Atorvastatin","Lipitor"],clarithromycin:["Clarithromycin"],amlodipine:["Amlodipine","Norvasc"],sertraline:["Sertraline","Zoloft"],tramadol:["Tramadol"],oxycodone:["Oxycodone"],alprazolam:["Alprazolam","Xanax"],digoxin:["Digoxin","Lanoxin"],amiodarone:["Amiodarone"],levothyroxine:["Levothyroxine","Synthroid"],calcium:["Calcium"],omeprazole:["Omeprazole","Prilosec"],ciprofloxacin:["Ciprofloxacin","Cipro"],clopidogrel:["Clopidogrel","Plavix"],metformin:["Metformin"],lithium:["Lithium"],metoprolol:["Metoprolol"],verapamil:["Verapamil"],methotrexate:["Methotrexate"],amoxicillin:["Amoxicillin"]};
const BLEED="Both raise the risk of bleeding.";
const I=[
["warfarin","ibuprofen","major","Together they raise the risk of serious bleeding, and NSAIDs also irritate the stomach lining."],
["warfarin","aspirin","major","Aspirin adds to warfarin’s blood-thinning effect and raises bleeding risk."],
["warfarin","naproxen","major","Together they raise the risk of serious bleeding, and NSAIDs also irritate the stomach lining."],
["warfarin","ciprofloxacin","major","Ciprofloxacin can raise warfarin levels (higher INR), increasing bleeding risk."],
["warfarin","amiodarone","major","Amiodarone can strongly raise warfarin levels. Close monitoring is usually needed."],
["warfarin","amoxicillin","moderate","Some antibiotics increase warfarin’s effect. INR monitoring is often advised."],
["warfarin","acetaminophen","moderate","Regular, higher-dose acetaminophen use can raise INR."],
["warfarin","sertraline","moderate","SSRIs can add to bleeding risk when taken with warfarin."],
["ibuprofen","aspirin","moderate","Ibuprofen can interfere with aspirin’s heart-protective effect, and both raise stomach bleeding risk."],
["ibuprofen","naproxen","moderate","Two NSAIDs together add side effects (stomach bleeding, kidney strain) without extra benefit."],
["ibuprofen","lisinopril","moderate","NSAIDs can weaken the blood-pressure effect and strain the kidneys."],
["naproxen","lisinopril","moderate","NSAIDs can weaken the blood-pressure effect and strain the kidneys."],
["ibuprofen","sertraline","moderate","SSRIs plus NSAIDs raise the risk of stomach and other bleeding."],
["ibuprofen","lithium","major","NSAIDs can raise lithium to toxic levels."],
["ibuprofen","methotrexate","major","NSAIDs can raise methotrexate levels and increase its toxicity."],
["ibuprofen","clopidogrel","moderate",BLEED],
["aspirin","clopidogrel","moderate","Sometimes prescribed on purpose, but it raises bleeding risk. Follow your prescriber’s plan."],
["aspirin","sertraline","moderate",BLEED],
["lisinopril","spironolactone","major","Both raise potassium. High potassium can cause dangerous heart rhythm problems."],
["lisinopril","lithium","major","ACE inhibitors can raise lithium levels."],
["sildenafil","nitroglycerin","major","Can cause a sudden, severe drop in blood pressure. Never combine."],
["simvastatin","clarithromycin","major","Clarithromycin greatly raises simvastatin levels, increasing the risk of muscle damage."],
["atorvastatin","clarithromycin","moderate","Clarithromycin raises statin levels and the risk of muscle problems."],
["simvastatin","amlodipine","moderate","Amlodipine raises simvastatin levels. The simvastatin dose is usually capped."],
["sertraline","tramadol","major","Risk of serotonin syndrome (agitation, fever, fast heartbeat) and seizures."],
["oxycodone","alprazolam","major","An opioid with a benzodiazepine can cause dangerous drowsiness and slowed breathing."],
["tramadol","alprazolam","major","An opioid with a benzodiazepine can cause dangerous drowsiness and slowed breathing."],
["digoxin","amiodarone","major","Amiodarone raises digoxin levels, risking toxicity."],
["digoxin","verapamil","moderate","Verapamil raises digoxin levels and can slow the heart rate."],
["metoprolol","verapamil","major","Together they can slow the heart too much and drop blood pressure."],
["levothyroxine","calcium","moderate","Calcium reduces levothyroxine absorption. Doses are usually spaced about 4 hours apart."],
["levothyroxine","omeprazole","minor","Less stomach acid may slightly lower levothyroxine absorption."],
["ciprofloxacin","calcium","moderate","Calcium binds ciprofloxacin and reduces absorption. Spacing the doses is usually advised."],
["ciprofloxacin","metformin","moderate","Fluoroquinolones can cause blood sugar swings in people taking diabetes medicines."],
["clopidogrel","omeprazole","moderate","Omeprazole can reduce clopidogrel’s activation, making it less effective."],
["methotrexate","amoxicillin","moderate","Penicillins can slow methotrexate clearance and raise its levels."]];


if(typeof module!=="undefined")module.exports={D,I};
