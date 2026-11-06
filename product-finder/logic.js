"use strict";
/*
 * DAP Product Finder - decision logic (concept demo).
 * Rules are built only from DAP published material surfaced in research:
 * - Alex Plus FAQ on dap.com: "Can I use this in a shower? No." and DAP's
 *   retailer replies state Alex Plus is not a kitchen & bath sealant.
 * - Alex Plus FAQ: paint-ready in 30 minutes, max joint 1/2" x 1/2", backer rod.
 * - Silicone Max is DAP's kitchen & bath silicone line.
 * - Kwik Seal Plus is DAP's kitchen & bath adhesive caulk line.
 * - Dynaflex 230 / Dynaflex Ultra are DAP's window, door and siding sealants.
 */
function recommend(a) {
  var paint = a.paint === "yes";
  var wide = a.joint === "wide";
  var result = { name: "", tagline: "", why: [], warning: null, secondary: null };

  if (a.project === "shower") {
    result.name = "Silicone Max Premium Silicone";
    result.tagline = "DAP's kitchen & bath silicone, built for daily water.";
    result.why = [
      "Showers and tubs need 100% silicone. It stays flexible and waterproof under daily spray.",
      "It is the DAP line made for kitchen & bath wet areas, with mold resistance built in.",
      "It comes in white and clear, so you can match tile or let grout lines show."
    ];
    result.warning = "Not Alex Plus. DAP's own Alex Plus FAQ answers \"Can I use this in a shower?\" with \"No,\" and DAP's retailer replies say Alex Plus is not designed or recommended as a kitchen and bath sealant. That mix-up is behind a stack of 1-star reviews.";
    if (paint) {
      result.why.push("You said you want to paint over it: 100% silicone is not paintable, so pick your color (white or clear) up front instead.");
    }
  } else if (a.project === "kitchen") {
    result.name = "Kwik Seal Plus";
    result.tagline = "Kitchen & bath adhesive caulk for sinks, counters and backsplashes.";
    result.why = [
      "Made for the splash zone around sinks and counters, not standing water.",
      "Bonds like an adhesive caulk, so it suits the small gaps and edges in a kitchen.",
      "Water clean-up while wet, and it dries to a clean, finished line."
    ];
    result.warning = "Sealing inside a shower or tub instead? Switch to the Shower & Tub path. This is not the pick for daily standing water.";
    if (paint) {
      result.secondary = "Painting the trim next to the sink? Use Alex Plus on the painted trim away from the splash zone, and Kwik Seal Plus only where water actually lands.";
    }
  } else if (a.project === "windows") {
    result.name = "Dynaflex Ultra";
    result.tagline = "Advanced exterior sealant for windows and doors.";
    result.why = [
      "Windows and doors move with weather. Dynaflex Ultra is DAP's flexible exterior answer for that movement.",
      "It is paintable, so it disappears into painted trim and siding.",
      "Built for exterior exposure: rain, sun and temperature swings."
    ];
    result.secondary = "Doing the interior side of the same window? Alex Plus is the easier interior pick, with water clean-up and paint in 30 minutes.";
  } else if (a.project === "trim") {
    result.name = "Alex Plus";
    result.tagline = "The painter's caulk for trim, molding and baseboards.";
    result.why = [
      "Paint-ready in 30 minutes per DAP's own FAQ, so the paint job does not stall.",
      "Smooth application and easy water clean-up, the two things reviewers praise most about Alex Plus.",
      "Flexible enough for indoor trim joints without cracking the paint line."
    ];
    if (!paint) {
      result.why.push("You do not need to paint it, and that is fine. It still gives the cleanest, easiest interior finish in the line.");
    }
    result.secondary = "In a hurry? Alex Fast Dry is the same family with a faster paint-ready time for rushed paint prep.";
  } else if (a.project === "exterior") {
    result.name = "Dynaflex 230";
    result.tagline = "Premium elastomeric sealant for siding and exterior cracks.";
    result.why = [
      "Exterior joints expand and contract hard. Dynaflex 230 is DAP's long-running answer for siding, windows and doors outside.",
      "It stays flexible after curing, which is exactly what happy reviewers call out.",
      "Paintable once cured, so repairs blend into the rest of the wall."
    ];
    result.warning = "Sealing a joint that stays underwater or a butt joint? DAP's label excludes both. That is a different product conversation, and the finder would rather tell you now than after it fails.";
  } else {
    result.name = "Alex Plus";
    result.tagline = "Start with the all-purpose painter's caulk.";
    result.why = ["Answer the project question and the finder will narrow this down."];
  }

  if (wide) {
    result.why.push("Your joint is wide or deep (over 1/2\"): set backer rod first. Most DAP latex sealants max out at a 1/2\" x 1/2\" joint, and backer rod keeps the depth at the ideal 1:2 ratio so the seal can flex instead of tearing.");
  }
  return result;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { recommend: recommend };
}
