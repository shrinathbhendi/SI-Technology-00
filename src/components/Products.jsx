import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { X, ChevronRight, ChevronLeft, Info, Send, LayoutGrid, Filter, FileText, Images } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── IMAGE BASE PATHS ─── */
const IMG = "/images/3D IMAGE WITH NAME SI-20260716T110720Z-1-001/3D IMAGE WITH NAME SI/";
const DS  = "/images/DATA SHEET SI-20260716T110725Z-1-001/DATA SHEET SI/";

/* ─── ALUMINIUM PROFILE PRODUCTS ─── */
const ALUMINIUM_PROFILES = [
  {
    id: "al-01",
    name: "20×20 T-Slot Profile",
    image: IMG + "20 X 20 T SLOT S I.png",
    dataSheet: DS + "PROFILE 20 X 20 T SLOT DATA SHEET SI.png",
    desc: "Compact 20×20mm T-slot aluminium extrusion for lightweight framing, machine guards, and small automation structures.",
    specs: { "Weight / M": "0.478 kg/m", "Qty / Box": "50 pcs", "Ix": "0.68 cm⁴", "Iy": "0.68 cm⁴", "Profile Surface": "68 cm²/m", "Slot Width": "6 mm", "Material": "6063-T6 Aluminium", "Application": "Light framing, guards, sensor mounting" },
  },
  {
    id: "al-02",
    name: "20×20 V-Slot Profile",
    image: IMG + "20 X 20 V SLOT S I.png",
    dataSheet: DS + "PROFILE 20 X 20 V SLOT DATA SHEET - SI.png",
    desc: "20×20mm V-slot profile optimised for linear motion systems with V-groove wheel compatibility.",
    specs: { "Weight / M": "0.488 kg/m", "Qty / Box": "50 pcs", "Ix": "0.72 cm⁴", "Iy": "0.72 cm⁴", "Profile Surface": "70 cm²/m", "Slot Width": "6 mm", "Material": "6063-T6 Aluminium", "Application": "Linear motion, CNC axes, 3D printers" },
  },
  {
    id: "al-03",
    name: "20×40 T-Slot Profile",
    image: IMG + "20 X 40 T SLOT S I.png",
    dataSheet: DS + "PROFILE 20 X 40 T SLOT DATA SHEET SI.png",
    desc: "Asymmetric 20×40mm T-slot extrusion offering higher bending stiffness in one axis for structural panels and doors.",
    specs: { "Weight / M": "0.963 kg/m", "Qty / Box": "30 pcs", "Ix": "3.84 cm⁴", "Iy": "1.02 cm⁴", "Profile Surface": "118 cm²/m", "Slot Width": "6 mm", "Material": "6063-T6 Aluminium", "Application": "Machine frames, panel doors, enclosures" },
  },
  {
    id: "al-04",
    name: "20×40 V-Slot Profile",
    image: IMG + "20 X 40 V SLOT S I.png",
    dataSheet: DS + "PROFILE 20 X 40 V SLOT DATA SHEET SI.png",
    desc: "20×40mm V-slot profile with dual V-grooves on the 40mm face for high-precision linear motion applications.",
    specs: { "Weight / M": "0.975 kg/m", "Qty / Box": "30 pcs", "Ix": "3.91 cm⁴", "Iy": "1.05 cm⁴", "Profile Surface": "120 cm²/m", "Slot Width": "6 mm", "Material": "6063-T6 Aluminium", "Application": "Dual-axis linear systems, gantry frames" },
  },
  {
    id: "al-05",
    name: "20×60 T-Slot Profile",
    image: IMG + "20 X 60 T SLOT S I.png",
    dataSheet: null,
    desc: "Slender 20×60mm T-slot profile providing exceptional stiffness-to-weight ratio for tall framing applications.",
    specs: { "Weight / M": "1.35 kg/m", "Qty / Box": "25 pcs", "Ix": "13.5 cm⁴", "Iy": "1.08 cm⁴", "Profile Surface": "168 cm²/m", "Slot Width": "6 mm", "Material": "6063-T6 Aluminium", "Application": "Tall frames, vertical structures, rack columns" },
  },
  {
    id: "al-06",
    name: "30×30 Profile",
    image: IMG + "30 X 30 SI.png",
    dataSheet: null,
    desc: "Standard 30×30mm square profile for medium-duty machine frames, workstations, and conveyor structures.",
    specs: { "Weight / M": "0.965 kg/m", "Qty / Box": "30 pcs", "Ix": "2.68 cm⁴", "Iy": "2.68 cm⁴", "Profile Surface": "112 cm²/m", "Slot Width": "8 mm", "Material": "6063-T6 Aluminium", "Application": "Workstations, conveyor frames, medium frames" },
  },
  {
    id: "al-07",
    name: "30×30 2SC Profile",
    image: IMG + "30 X 30 2SC SI.png",
    dataSheet: DS + "PROFILE 30 X 30 2SC DATA SHEET SI.png",
    desc: "30×30mm double-slot-center variant with central bore for screw fastening — ideal for concealed connections.",
    specs: { "Weight / M": "1.05 kg/m", "Qty / Box": "30 pcs", "Ix": "2.92 cm⁴", "Iy": "2.92 cm⁴", "Profile Surface": "116 cm²/m", "Slot Width": "8 mm", "Material": "6063-T6 Aluminium", "Application": "Concealed joints, tool storage, shelving" },
  },
  {
    id: "al-08",
    name: "30×60 Profile",
    image: IMG + "30 X 60 SI.png",
    dataSheet: DS + "PROFILE 30 X 60 DATA SHEET SI.png",
    desc: "Asymmetric 30×60mm profile delivering 4× more bending rigidity along the long axis for horizontal beams.",
    specs: { "Weight / M": "1.79 kg/m", "Qty / Box": "20 pcs", "Ix": "18.6 cm⁴", "Iy": "4.12 cm⁴", "Profile Surface": "208 cm²/m", "Slot Width": "8 mm", "Material": "6063-T6 Aluminium", "Application": "Horizontal beams, conveyor side rails" },
  },
  {
    id: "al-09",
    name: "30×90 Profile",
    image: IMG + "30 X 90 SI.png",
    dataSheet: DS + "PROFILE 30 X 90 DATA SHEET SI.png",
    desc: "Long 30×90mm profile for wide-span horizontal structures, overhead crane beams, and industrial gantries.",
    specs: { "Weight / M": "2.68 kg/m", "Qty / Box": "15 pcs", "Ix": "73.2 cm⁴", "Iy": "5.48 cm⁴", "Profile Surface": "296 cm²/m", "Slot Width": "8 mm", "Material": "6063-T6 Aluminium", "Application": "Wide-span beams, overhead structures, gantries" },
  },
  {
    id: "al-10",
    name: "40×40 Heavy Profile",
    image: IMG + "40 X 40 H.png",
    dataSheet: DS + "PROFILE 40 X 40 HEAVY DATA SHEET SI.png",
    desc: "Heavy-duty 40×40mm profile with reinforced wall thickness for demanding structural applications.",
    specs: { "Weight / M": "2.38 kg/m", "Qty / Box": "20 pcs", "Ix": "10.8 cm⁴", "Iy": "10.8 cm⁴", "Profile Surface": "202 cm²/m", "Slot Width": "10 mm", "Material": "6063-T6 Aluminium", "Application": "Heavy machine frames, industrial structures" },
  },
  {
    id: "al-11",
    name: "40×40 Light Profile",
    image: IMG + "40 X 40 L.png",
    dataSheet: DS + "PROFILE 40 X 40 LIGHT DATA SHEET SI.png",
    desc: "Lightweight 40×40mm profile for cost-efficient structures requiring moderate strength-to-weight ratio.",
    specs: { "Weight / M": "1.45 kg/m", "Qty / Box": "20 pcs", "Ix": "7.95 cm⁴", "Iy": "7.95 cm⁴", "Profile Surface": "180 cm²/m", "Slot Width": "10 mm", "Material": "6063-T6 Aluminium", "Application": "Light automation frames, display structures" },
  },
  {
    id: "al-12",
    name: "40×40 Medium Profile",
    image: IMG + "40 X 40 M.png",
    dataSheet: DS + "PROFILE 40 X 40 MEDIUM DATA SHEET SI.png",
    desc: "Balanced 40×40mm medium profile — the most versatile choice for general-purpose aluminium framing systems.",
    specs: { "Weight / M": "1.85 kg/m", "Qty / Box": "20 pcs", "Ix": "9.25 cm⁴", "Iy": "9.25 cm⁴", "Profile Surface": "188 cm²/m", "Slot Width": "10 mm", "Material": "6063-T6 Aluminium", "Application": "General automation, workstations, enclosures" },
  },
  {
    id: "al-13",
    name: "40×80 Profile",
    image: IMG + "40 X 80.png",
    dataSheet: DS + "PROFILE 40 X 80 DATA SHEET SI.png",
    desc: "High-rigidity 40×80mm rectangular profile for machine base frames and linear rail mounting systems.",
    specs: { "Weight / M": "3.12 kg/m", "Qty / Box": "12 pcs", "Ix": "61.8 cm⁴", "Iy": "16.4 cm⁴", "Profile Surface": "328 cm²/m", "Slot Width": "10 mm", "Material": "6063-T6 Aluminium", "Application": "Machine bases, linear rail systems, heavy frames" },
  },
  {
    id: "al-14",
    name: "45×45 Profile",
    image: IMG + "45 X 45.png",
    dataSheet: null,
    desc: "45×45mm profile bridging the gap between 40 and 50 series for premium workstation and safety enclosure builds.",
    specs: { "Weight / M": "2.05 kg/m", "Qty / Box": "18 pcs", "Ix": "14.6 cm⁴", "Iy": "14.6 cm⁴", "Profile Surface": "218 cm²/m", "Slot Width": "10 mm", "Material": "6063-T6 Aluminium", "Application": "Premium workstations, safety enclosures" },
  },
  {
    id: "al-15",
    name: "45×60 Profile",
    image: IMG + "45 X 60.png",
    dataSheet: null,
    desc: "Asymmetric 45×60mm profile for horizontal beam applications requiring extra depth without a full 60 series width.",
    specs: { "Weight / M": "2.62 kg/m", "Qty / Box": "15 pcs", "Ix": "32.5 cm⁴", "Iy": "18.4 cm⁴", "Profile Surface": "268 cm²/m", "Slot Width": "10 mm", "Material": "6063-T6 Aluminium", "Application": "Deep horizontal beams, panel supports" },
  },
  {
    id: "al-16",
    name: "45×90 Profile",
    image: IMG + "45 X 90.png",
    dataSheet: null,
    desc: "Long-span 45×90mm profile for industrial-grade overhead beams and portal frame structures.",
    specs: { "Weight / M": "3.78 kg/m", "Qty / Box": "10 pcs", "Ix": "108 cm⁴", "Iy": "25.6 cm⁴", "Profile Surface": "380 cm²/m", "Slot Width": "10 mm", "Material": "6063-T6 Aluminium", "Application": "Portal frames, overhead structures, cranes" },
  },
  {
    id: "al-17",
    name: "50×50 Profile",
    image: IMG + "50 X 50.png",
    dataSheet: null,
    desc: "Robust 50×50mm square profile for heavy-duty machine frames, robotic cells, and structural columns.",
    specs: { "Weight / M": "2.89 kg/m", "Qty / Box": "15 pcs", "Ix": "22.8 cm⁴", "Iy": "22.8 cm⁴", "Profile Surface": "260 cm²/m", "Slot Width": "10 mm", "Material": "6063-T6 Aluminium", "Application": "Heavy machine frames, robotic cells, columns" },
  },
  {
    id: "al-18",
    name: "60×60 4-Slot Profile",
    image: IMG + "60 X 60 4 SLOT.png",
    dataSheet: null,
    desc: "Large 60×60mm profile with 4 T-slots for maximum connectivity — ideal for heavy industrial framing.",
    specs: { "Weight / M": "3.95 kg/m", "Qty / Box": "10 pcs", "Ix": "56.4 cm⁴", "Iy": "56.4 cm⁴", "Profile Surface": "348 cm²/m", "Slot Width": "12 mm", "Material": "6063-T6 Aluminium", "Application": "Heavy industrial frames, AGV structures" },
  },
  {
    id: "al-19",
    name: "60×60 8-Slot Profile",
    image: IMG + "60 X 60 8 SLOT.png",
    dataSheet: null,
    desc: "Premium 60×60mm profile with 8 T-slots providing full-perimeter connectivity for complex multi-directional frames.",
    specs: { "Weight / M": "4.35 kg/m", "Qty / Box": "10 pcs", "Ix": "60.2 cm⁴", "Iy": "60.2 cm⁴", "Profile Surface": "368 cm²/m", "Slot Width": "12 mm", "Material": "6063-T6 Aluminium", "Application": "Complex frames, all-direction mounting systems" },
  },
  {
    id: "al-20",
    name: "R30 Round Profile",
    image: IMG + "R30 SI.png",
    dataSheet: DS + "PROFILE R30 DATA SHEET SI.png",
    desc: "30mm round aluminium tube extrusion for ergonomic handrails, safety barriers, and anti-fatigue workstation frames.",
    specs: { "Weight / M": "0.845 kg/m", "Qty / Box": "20 pcs", "Ix": "2.04 cm⁴", "Iy": "2.04 cm⁴", "Profile Surface": "94 cm²/m", "Outer Diameter": "30 mm", "Material": "6063-T6 Aluminium", "Application": "Handrails, safety barriers, ergonomic frames" },
  },
  {
    id: "al-21",
    name: "R40 Round Profile",
    image: IMG + "R40 SI.png",
    dataSheet: DS + "PROFILE R40 DATA SHEET SI.png",
    desc: "40mm round aluminium extrusion for heavy-duty handrail systems, structural pillars, and decorative framing.",
    specs: { "Weight / M": "1.28 kg/m", "Qty / Box": "15 pcs", "Ix": "5.64 cm⁴", "Iy": "5.64 cm⁴", "Profile Surface": "126 cm²/m", "Outer Diameter": "40 mm", "Material": "6063-T6 Aluminium", "Application": "Heavy handrails, structural pillars, columns" },
  },
];

const FASTENERS = [
  {
    id: "fa-conn-fasteners",
    name: "Aluminium Profile Connection Accessories & Fasteners",
    image: "/images/Aluminium profile conection accessories.png",
    gallery: ["/images/Aluminium profile conection accessories.png"],
    desc: "Essential connection hardware set featuring hammer-head T-bolts, roll-in T-nuts with spring ball, heavy-duty gusset brackets, and precision fasteners for structural framing.",
    specs: {
      "Thread Sizes": "M4, M5, M6, M8 Metric Threads",
      "Slot Width": "6mm, 8mm, 10mm Standard DIN T-Slots",
      "Material": "Grade 8.8 Carbon Steel + Zinc Plated / Die-Cast Aluminium",
      "Corrosion Resistance": "High-Durability Zinc-Plated & Anodized Finish",
      "Torque Rating": "Up to 25 Nm depending on thread diameter",
      "Application": "Modular frame joints, dynamic load assemblies, profile fastening"
    }
  },
  {
    id: "fa-01",
    name: "T-Bolt M6 × 12mm",
    image: null,
    desc: "Hammer-head T-bolts that slide into any 6mm T-slot for tool-free repositioning of accessories and brackets.",
    specs: { "Thread": "M6", "Length": "12 mm", "Head Type": "T-Head / Hammer", "Material": "Carbon Steel + Zinc", "Torque": "8–10 Nm", "Application": "T-slot fastening, bracket mounting" },
  },
  {
    id: "fa-02",
    name: "End Plate Connector",
    image: null,
    desc: "Precision-machined end-plate connector enabling butt joints between profiles at any angle.",
    specs: { "Thread": "M8", "Length": "25 mm", "Material": "Zinc Die-cast", "Finish": "Silver Anodised", "Max Load": "2.4 kN", "Application": "Profile end-to-end connections" },
  },
  {
    id: "fa-03",
    name: "3-Way Angle Bracket",
    image: null,
    desc: "Heavy-duty internal die-cast bracket for 90° three-profile corner joints with high pull-out strength.",
    specs: { "Size": "40×40×40 mm", "Material": "Zinc Die-cast", "Finish": "Silver Anodised", "Screws": "M6×12 T-bolts", "Max Load": "1.8 kN", "Application": "Corner frames, 3-way joints" },
  },
];

const ACCESSORIES = [
  {
    id: "ac-conn-accessories",
    name: "Aluminium Profile Connection Accessories",
    image: "/images/Aluminium profile conection accessories.png",
    gallery: ["/images/Aluminium profile conection accessories.png"],
    desc: "Complete collection of precision connection accessories and joint elements for aluminium profiles, including die-cast corner brackets, internal hidden joints, T-bolts, spring nuts, corner gussets, and structural mounting hardware.",
    specs: {
      "Compatible Profiles": "2020 / 3030 / 4040 / 4545 / 8080 Series T-Slot & V-Slot",
      "Components Included": "Corner Brackets, Gussets, T-Nuts, Central Bolts, End Plates",
      "Material": "Die-Cast Aluminium Alloy 6063-T6 / High-Tensile Zinc Alloy / Steel",
      "Surface Finish": "Silver Matte Anodized / Vibratory Polished / Nickel Plated",
      "Joint Types": "90° Corner Joint, Butt Joint, Hidden Internal Joint, Swivel Plate",
      "Application": "Machine framing, protective guards, cleanroom cells, industrial workstations"
    }
  },
  {
    id: "ac-01",
    name: "Pivot Hinge 40 Series",
    image: null,
    desc: "Full-width piano-style pivot hinge for panel doors and access covers on 40-series profile frames.",
    specs: { "Width": "40 mm", "Material": "Extruded Aluminium", "Rotation": "180°", "Load": "Up to 15 kg/pair", "Finish": "Mill / Natural", "Application": "Panel doors, hinged covers" },
  },
  {
    id: "ac-02",
    name: "Levelling Foot Ø50",
    image: null,
    desc: "Adjustable levelling foot with Ø50mm rubber base pad for vibration damping and floor level compensation.",
    specs: { "Base Diameter": "50 mm", "Adjustment": "±20 mm", "Thread": "M10×1.5", "Max Load": "600 kg", "Material": "PA Nylon + Rubber", "Application": "Machine levelling, anti-vibration" },
  },
  {
    id: "ac-03",
    name: "Panel Slot Cover Strip",
    image: null,
    desc: "Snap-in decorative slot cover for hiding unused T-slot grooves — available in black and grey.",
    specs: { "Width": "6 / 8 / 10 mm", "Material": "PVC", "Length": "2 m per strip", "Colors": "Black, Grey, White", "Application": "Slot coverage, cable management" },
  },
];

const WORKSTATIONS = [
  {
    id: "ws-organized-assembly",
    name: "Organized Assembly Workstation",
    image: "/images/organized assemble work station.png",
    gallery: ["/images/organized assemble work station.png"],
    desc: "Ergonomic manual assembly workbench featuring a steel pegboard tool organizer, color-coded parts storage bins, an overhead LED luminaire, an articulated A4 work instruction board, and an integrated multi-socket power strip.",
    specs: {
      "Load Capacity": "300–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6 (40×40 / 45×45)",
      "Worksurface": "Heavy-Duty Scratch-Resistant Industrial Laminate",
      "Tool Storage": "Perforated Steel Pegboard with Hook Set",
      "Parts Management": "4-Compartment Color-Coded Parts Bin Rack",
      "Illumination": "Integrated Overhead Glare-Free LED Light Bar",
      "Accessories": "Articulated A4 Work Instruction Holder & Power Strip",
      "Levelling": "Vibration-Damping M12 Adjustable Leveling Feet",
      "Application": "Lean manufacturing, manual assembly lines, kitting, sub-assembly",
    },
  },
  {
    id: "ws-pcb-testing",
    name: "PCB Testing Workstation",
    image: "/images/PCB Testing Workstation.png",
    gallery: ["/images/PCB Testing Workstation.png"],
    desc: "Dedicated electronics and PCB testing station with pass/fail visual stack light, dual instrument shelves for oscilloscope and power supplies, VESA monitor arm, barcode scanner mount, and dual sorting bins.",
    specs: {
      "Load Capacity": "250–500 kg",
      "Frame Material": "Anodised Aluminium 6063-T6 Profile",
      "Worktop": "Anti-Static Static-Dissipative ESD Green Mat",
      "Signal Tower": "3-Tier Red/Amber/Green Andon Stack Light",
      "Instrument Shelf": "Dual Heavy-Duty Upper Shelves for Oscilloscope & DMM",
      "Display & Mounts": "Articulated VESA Monitor Arm & Barcode Scanner Stand",
      "Storage": "Lockable Drawer & Dual OK / Reject Component Bins",
      "Application": "PCB functional testing, automated ICT/FCT inspection, QC diagnostics",
    },
  },
  {
    id: "ws-esd-station",
    name: "ESD Electronics Workstation",
    image: "/images/ESD workstation.png",
    gallery: ["/images/ESD workstation.png"],
    desc: "Static-dissipative electronics assembly workstation with ESD wrist strap continuous monitoring, overhead LED task lighting, soldering station mount, component trays, ESD waste bin, and ergonomic anti-static seating.",
    specs: {
      "Load Capacity": "250–500 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Worktop": "Full Static-Dissipative (ESD) Blue Mat with Common Point Ground",
      "ESD Monitoring": "Continuous Dual-Station Wrist Strap Ground Monitor",
      "Illumination": "Overhead LED Task Light with Diffuser",
      "Workstation Addons": "Soldering Iron Stand, Component Bins, ESD Waste Bin",
      "Seating": "Conductive Anti-Static Ergonomic Rolling Chair",
      "Application": "SMT electronics assembly, microchip handling, soldering, rework",
    },
  },
  {
    id: "ws-inspection-table",
    name: "Quality Inspection Table",
    image: "/images/Inspection Table1.png",
    gallery: ["/images/Inspection Table1.png"],
    desc: "Precision quality inspection table with an articulated magnifying inspection lamp, overhead high-CRI inspection illumination gantry, swivel clipboard for QC checklists and technical drawings, and lower steel storage shelf.",
    specs: {
      "Load Capacity": "300–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Worktop": "Non-Glare Precision Inspection Surface",
      "Inspection Optics": "Articulated Arm Magnifying Inspection Lamp (LED)",
      "Documentation": "Swivel Document Board for QC Checklists & Drawings",
      "Storage": "Spacious Lower Steel Storage Shelf & Parts Bins",
      "Illumination": "High-CRI Uniform Overhead Inspection Light Gantry",
      "Application": "Quality assurance (QA/QC), visual defect checking, metrology",
    },
  },
  {
    id: "ws-ms-fabricator-table",
    name: "MS Fabricator & Welding Table",
    image: "/images/MS Fabricator Table.png",
    gallery: ["/images/MS Fabricator Table.png"],
    desc: "Heavy-duty industrial mild steel fabrication and welding table with reinforced steel top, precision clamping grid, integrated tool shelves, and heavy structural legs.",
    specs: {
      "Load Capacity": "1000–2500 kg",
      "Table Top Material": "Precision Ground Mild Steel Plate (10mm - 20mm)",
      "Frame Structure": "Heavy-Duty MS Hollow Section Welded Construction",
      "Surface Treatment": "Anti-Rust Primer & Industrial Powder Coating",
      "Fixture Grid": "D28 / D16 Precision CNC Clamping Hole Matrix",
      "Leveling": "Heavy-Duty Anti-Vibration M20 Swivel Leveling Pads",
      "Application": "Welding fixtures, metal fabrication, precision assembly, heavy tool repair"
    },
  },
  {
    id: "ws-001",
    name: "Heavy-Duty Profile Assembly Workstation",
    image: "/images/workstations/workstations_001.jpg",
    gallery: ["/images/workstations/workstations_001.jpg", "/images/workstations/workstations_001_a.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-003",
    name: "Shopfloor Workbench with Upper Shelf",
    image: "/images/workstations/workstations_003.jpg",
    gallery: ["/images/workstations/workstations_003.jpg", "/images/workstations/workstations_003_a.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-008",
    name: "Profile Workbench with Overhead Structure",
    image: "/images/workstations/workstations_008.jpg",
    gallery: ["/images/workstations/workstations_008.jpg", "/images/workstations/workstations_008_a.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-010",
    name: "Shopfloor Workstation with Footrest",
    image: "/images/workstations/workstations_010.jpg",
    gallery: ["/images/workstations/workstations_010.jpg", "/images/workstations/workstations_010_a.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-011",
    name: "Assembly Bench with Pegboard Panel",
    image: "/images/workstations/workstations_011.jpg",
    gallery: ["/images/workstations/workstations_011.jpg", "/images/workstations/workstations_011_a.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-014",
    name: "Dual-Level Packing Station",
    image: "/images/workstations/workstations_014.jpg",
    gallery: ["/images/workstations/workstations_014.jpg", "/images/workstations/workstations_014_a.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-015",
    name: "Corner Assembly Workstation",
    image: "/images/workstations/workstations_015.jpg",
    gallery: ["/images/workstations/workstations_015.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-021",
    name: "ESD Electronics Assembly Station",
    image: "/images/workstations/workstations_021.jpg",
    gallery: ["/images/workstations/workstations_021.jpg", "/images/workstations/workstations_021_a.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-022",
    name: "Sit-Stand Height Adjustable Bench",
    image: "/images/workstations/workstations_022.jpg",
    gallery: ["/images/workstations/workstations_022.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-024",
    name: "Mobile Rolling Workstation",
    image: "/images/workstations/workstations_024.jpg",
    gallery: ["/images/workstations/workstations_024.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-025",
    name: "Custom PLC Testing Console Station",
    image: "/images/workstations/workstations_025.jpg",
    gallery: ["/images/workstations/workstations_025.jpg", "/images/workstations/workstations_025_a.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-032",
    name: "Double-Bay Assembly Island",
    image: "/images/workstations/workstations_032.jpg",
    gallery: ["/images/workstations/workstations_032.jpg", "/images/workstations/workstations_032_a.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-033",
    name: "Profile Workbench with Overhead Lighting",
    image: "/images/workstations/workstations_033.jpg",
    gallery: ["/images/workstations/workstations_033.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-036",
    name: "Profile Assembly Bench with Safety Enclosure",
    image: "/images/workstations/workstations_036.jpg",
    gallery: ["/images/workstations/workstations_036.jpg", "/images/workstations/workstations_036_a.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-041",
    name: "Welding & Fabrication Workstation",
    image: "/images/workstations/workstations_041.jpg",
    gallery: ["/images/workstations/workstations_041.jpg", "/images/workstations/workstations_041_a.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-043",
    name: "Profile Workbench with Drawer Unit",
    image: "/images/workstations/workstations_043.jpg",
    gallery: ["/images/workstations/workstations_043.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-046",
    name: "Inspection & QC Workstation",
    image: "/images/workstations/workstations_046.jpg",
    gallery: ["/images/workstations/workstations_046.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  },
  {
    id: "ws-050",
    name: "Mobile Profile Tool Cart & Workstation",
    image: "/images/workstations/workstations_050.jpg",
    gallery: ["/images/workstations/workstations_050.jpg"],
    desc: "Modular workstation application featuring SI Technology heavy-duty aluminium profile systems and integrated accessories.",
    specs: {
      "Load Capacity": "150–600 kg",
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "30 / 40 / 45 / 60 Series",
      "Surface": "MDF / ESD Laminate / Steel",
      "Levelling": "Adjustable M10 feet",
      "Application": "Industrial assembly, testing, inspection",
    },
  }
];

const PIPE_JOINT = [
  {
    id: "pj-accessories-01",
    name: "Pipe & Joint Modular Accessories",
    image: "/images/Pipe & Joint Accessories.png",
    gallery: ["/images/Pipe & Joint Accessories.png"],
    desc: "Complete assortment of precision modular accessories for lean pipe and joint structures, including metal joints, placon roller tracks, mounting brackets, slide rails, and end caps.",
    specs: {
      "Material": "SPCC Cold Rolled Steel / Electrophoretic Coating",
      "Joint Types": "T-Joint, Cross-Joint, Angle Joint, Swivel Connector",
      "Roller Tracks": "Aluminium / Steel Placon Roller Guides",
      "Compatibility": "Ø28mm Lean Coated & Stainless Steel Pipes",
      "Finish": "Black Electrophoresis / Nickel-Plated / Zinc-Plated",
      "Application": "FIFO flow racks, assembly trolleys, Kaizen lean cells"
    }
  },
  {
    id: "pj-001",
    name: "Lean Pipe & Joint Assembly Trolley",
    image: "/images/pipe_joint/pipe_joint_001.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_001.jpg", "/images/pipe_joint/pipe_joint_001_a.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-003",
    name: "Multi-Level Pipe Flow Rack",
    image: "/images/pipe_joint/pipe_joint_003.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_003.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-005",
    name: "Gravity Flow Roller Lane Assembly",
    image: "/images/pipe_joint/pipe_joint_005.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_005.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-007",
    name: "Pipe & Joint Mobile Cart",
    image: "/images/pipe_joint/pipe_joint_007.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_007.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-009",
    name: "Angled Flow Rack — Pipe & Joint",
    image: "/images/pipe_joint/pipe_joint_009.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_009.jpg", "/images/pipe_joint/pipe_joint_009_a.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-011",
    name: "Lean Material Feeder Station",
    image: "/images/pipe_joint/pipe_joint_011.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_011.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-013",
    name: "Pipe & Joint Corner Work Cell",
    image: "/images/pipe_joint/pipe_joint_013.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_013.jpg", "/images/pipe_joint/pipe_joint_013_a.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-014",
    name: "Multi-Tier Storage Rack",
    image: "/images/pipe_joint/pipe_joint_014.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_014.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-017",
    name: "Pipe Frame Tool Trolley",
    image: "/images/pipe_joint/pipe_joint_017.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_017.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-021",
    name: "Lean Kitting Station",
    image: "/images/pipe_joint/pipe_joint_021.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_021.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-024",
    name: "Pipe & Joint Packing Station",
    image: "/images/pipe_joint/pipe_joint_024.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_024.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-029",
    name: "Pipe Frame with Drawer Unit",
    image: "/images/pipe_joint/pipe_joint_029.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_029.jpg", "/images/pipe_joint/pipe_joint_029_a.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-036",
    name: "Pipe Workstation with LED Light",
    image: "/images/pipe_joint/pipe_joint_036.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_036.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-042",
    name: "Pipe Frame with ESD Surface",
    image: "/images/pipe_joint/pipe_joint_042.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_042.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  },
  {
    id: "pj-047",
    name: "Pipe Frame Kanban Rack",
    image: "/images/pipe_joint/pipe_joint_047.jpg",
    gallery: ["/images/pipe_joint/pipe_joint_047.jpg"],
    desc: "Lean modular pipe structure featuring SI Technology Ø28mm coated pipes and high strength joint connectors.",
    specs: {
      "Pipe Size": "Ø28 mm ABS-Coated Steel",
      "Joint Type": "Plastic / Nickel-Plated Steel",
      "Load Capacity": "80–200 kg",
      "Surface": "MDF / ESD Laminate",
      "Mobility": "Fixed feet / Castors",
      "Application": "Lean manufacturing, Kaizen, kitting",
    },
  }
];

const PROFILE_APP = [
  {
    id: "pa-001",
    name: "Aluminium Profile Assembly Application",
    image: "/images/profile_app/pa_001.jpg",
    gallery: ["/images/profile_app/pa_001.jpg", "/images/profile_app/pa_001_a.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-003",
    name: "Custom Profile System Installation",
    image: "/images/profile_app/pa_003.jpg",
    gallery: ["/images/profile_app/pa_003.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-006",
    name: "Profile Mounting System",
    image: "/images/profile_app/pa_006.jpg",
    gallery: ["/images/profile_app/pa_006.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-008",
    name: "Profile Frame Application — Type A",
    image: "/images/profile_app/pa_008.jpg",
    gallery: ["/images/profile_app/pa_008.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-011",
    name: "Profile System — Heavy Duty",
    image: "/images/profile_app/pa_011.jpg",
    gallery: ["/images/profile_app/pa_011.jpg", "/images/profile_app/pa_011_a.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-013",
    name: "Custom Profile Build",
    image: "/images/profile_app/pa_013.jpg",
    gallery: ["/images/profile_app/pa_013.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-016",
    name: "Profile & Connector Assembly",
    image: "/images/profile_app/pa_016.jpg",
    gallery: ["/images/profile_app/pa_016.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-020",
    name: "Aluminium Profile Application — Large",
    image: "/images/profile_app/pa_020.jpg",
    gallery: ["/images/profile_app/pa_020.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-025",
    name: "Aluminium Profile Work Cell",
    image: "/images/profile_app/pa_025.jpg",
    gallery: ["/images/profile_app/pa_025.jpg", "/images/profile_app/pa_025_a.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-028",
    name: "Profile Application — Heavy Frame",
    image: "/images/profile_app/pa_028.jpg",
    gallery: ["/images/profile_app/pa_028.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-033",
    name: "Profile System — ESD",
    image: "/images/profile_app/pa_033.jpg",
    gallery: ["/images/profile_app/pa_033.jpg", "/images/profile_app/pa_033_a.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-034",
    name: "Profile Frame with Guards",
    image: "/images/profile_app/pa_034.jpg",
    gallery: ["/images/profile_app/pa_034.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-039",
    name: "Profile Assembly — Automation",
    image: "/images/profile_app/pa_039.jpg",
    gallery: ["/images/profile_app/pa_039.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-044",
    name: "Profile Frame with Enclosure",
    image: "/images/profile_app/pa_044.jpg",
    gallery: ["/images/profile_app/pa_044.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  },
  {
    id: "pa-050",
    name: "Profile Application — Precision",
    image: "/images/profile_app/pa_050.jpg",
    gallery: ["/images/profile_app/pa_050.jpg"],
    desc: "Real-world aluminium profile system application showcasing SI Technology precision extrusion and modular framing solutions.",
    specs: {
      "Frame Material": "Anodised Aluminium 6063-T6",
      "Profile Series": "20 / 30 / 40 / 45 / 60 Series",
      "Surface Finish": "Mill Finish / Anodised",
      "Connections": "T-Bolt, L-Bracket, End Plate",
      "Custom Options": "Cut-to-length, Drilled",
      "Application": "Industrial framing, machine guarding",
    },
  }
];

const BELT_CONVEYORS = [
  {
    id: "cv-001",
    name: "Industrial Duty Flat Belt Conveyor",
    image: "/images/conveyor/Picture 142.jpg",
    gallery: ["/images/conveyor/Picture 142.jpg", "/images/conveyor/Picture 143.jpg"],
    desc: "A motorized flat belt conveyor built on a rugged aluminium extrusion profile frame, designed for continuous and smooth transport of packaged products in industrial lines.",
    specs: {
      "Belt Material": "PVC / PU Green Belt",
      "Frame Material": "Aluminium Alloy 6063 T6",
      "Load Capacity": "Up to 80 kg",
      "Drive Type": "Direct End-Drive Motor",
      "Speed Range": "5 to 25 m/min (Variable)",
      "Application": "Food packaging, parts sorting, warehouse shipping"
    }
  },
  {
    id: "cv-002",
    name: "Heavy-Duty Modular Belt Conveyor",
    image: "/images/conveyor/Picture 157.jpg",
    gallery: ["/images/conveyor/Picture 157.jpg", "/images/conveyor/Picture 158.jpg"],
    desc: "Heavy-duty conveyor with modular link plastic belt. Highly durable and customizable, perfect for conveying heavier materials and handling tough assembly line environments.",
    specs: {
      "Belt Material": "PP/PE Modular Plastic Links",
      "Frame Material": "Aluminium Alloy 6063 T6",
      "Load Capacity": "Up to 150 kg",
      "Drive Type": "Direct End-Drive Motor",
      "Speed Range": "3 to 20 m/min (Variable)",
      "Application": "Heavy parts conveying, automotive component handling"
    }
  },
  {
    id: "cv-003",
    name: "Adjustable Incline Belt Conveyor",
    image: "/images/conveyor/Picture 171.jpg",
    gallery: [
      "/images/conveyor/Picture 171.jpg",
      "/images/conveyor/Picture 172.jpg"
    ],
    desc: "Incline belt conveyor with high-friction PU surface and adjustable support legs. Ideal for moving boxes, bags, and loose items between different levels or platforms.",
    specs: {
      "Belt Material": "High-Friction PU Green Belt",
      "Frame Material": "Aluminium Alloy 6063 T6",
      "Load Capacity": "Up to 60 kg",
      "Drive Type": "Direct Gear Motor",
      "Speed Range": "4 to 18 m/min (Variable)",
      "Incline Angle": "Adjustable up to 35 degrees"
    }
  },
  {
    id: "cv-004",
    name: "Aluminium Profile Frame Conveyor",
    image: "/images/conveyor/Picture 200.jpg",
    gallery: ["/images/conveyor/Picture 200.jpg", "/images/conveyor/Picture 201.jpg"],
    desc: "Standardized modular conveyor system using aluminium profile frames. Central drive mechanism allows for clean ends, making it suitable for inline integration with machines.",
    specs: {
      "Belt Material": "PVC Black / Green Smooth Belt",
      "Frame Material": "Aluminium Alloy 6063 T6",
      "Load Capacity": "Up to 75 kg",
      "Drive Type": "Center Drive Assembly",
      "Speed Range": "5 to 30 m/min (Variable)"
    }
  },
  {
    id: "cv-005",
    name: "Modular Cleated Belt Conveyor",
    image: "/images/conveyor/Picture 374.jpg",
    gallery: ["/images/conveyor/Picture 374.jpg", "/images/conveyor/Picture 375.jpg"],
    desc: "Cleated belt conveyor system to prevent materials from sliding backwards. Outstanding for steep incline transports of bulk items like grains, seeds, or small molded components.",
    specs: {
      "Belt Material": "PU Belt with 20mm/30mm Cleats",
      "Frame Material": "Aluminium Alloy 6063 T6",
      "Load Capacity": "Up to 50 kg",
      "Drive Type": "End Drive Motor",
      "Speed Range": "3 to 15 m/min (Variable)"
    }
  },
  {
    id: "cv-006",
    name: "Variable Speed Belt Conveyor",
    image: "/images/conveyor/Picture 422.jpg",
    gallery: ["/images/conveyor/Picture 422.jpg", "/images/conveyor/Picture 423.jpg"],
    desc: "High-speed conveyor featuring a digital speed controller and anti-static PU belt, ideal for precise sorting and alignment in manufacturing and packaging lines.",
    specs: {
      "Belt Material": "PU Anti-Static Belt",
      "Frame Material": "Aluminium Alloy 6063 T6",
      "Load Capacity": "Up to 90 kg",
      "Drive Type": "Variable Frequency Drive Motor",
      "Speed Range": "2 to 40 m/min (Variable)"
    }
  },
  {
    id: "cv-007",
    name: "Miniature Belt Conveyor System",
    image: "/images/conveyor/Picture 493.jpg",
    gallery: [
      "/images/conveyor/Picture 493.jpg",
      "/images/conveyor/Picture 494.jpg"
    ],
    desc: "Compact and low-profile miniature belt conveyor system designed for small parts handling, electronics inspection, and medical packaging industries.",
    specs: {
      "Belt Material": "PVC Mini-conveyor Belt",
      "Frame Material": "Aluminium Alloy 6063 T6",
      "Load Capacity": "Up to 25 kg",
      "Drive Type": "Integrated DC Brushless Motor",
      "Speed Range": "1 to 10 m/min (Variable)"
    }
  },
  {
    id: "cv-008",
    name: "Wide Belt Transport Conveyor",
    image: "/images/conveyor/Picture 606.jpg",
    gallery: ["/images/conveyor/Picture 606.jpg", "/images/conveyor/Picture 607.jpg"],
    desc: "Wide flat belt conveyor designed for transporting bulky materials, boxes, or wide sheets. Built on an reinforced 80x80 aluminium profile support stand.",
    specs: {
      "Belt Material": "Heavy-Duty PVC Belt (Wide Series)",
      "Frame Material": "Aluminium Alloy 6063 T6",
      "Load Capacity": "Up to 120 kg",
      "Drive Type": "End Drive Assembly",
      "Speed Range": "5 to 22 m/min"
    }
  },
  {
    id: "cv-009",
    name: "Heavy Load Conveyor System",
    image: "/images/conveyor/Picture 776.jpg",
    gallery: [
      "/images/conveyor/Picture 776.jpg",
      "/images/conveyor/Picture 777.jpg"
    ],
    desc: "Reinforced heavy-load conveyor built with high-torque gearmotor and robust support framework, optimized for harsh environments like mining, aggregates, and construction.",
    specs: {
      "Belt Material": "PVG Flame-Resistant Belt",
      "Frame Material": "Steel/Aluminium Alloy 6063 T6",
      "Load Capacity": "Up to 250 kg",
      "Drive Type": "High Torque Gearmotor",
      "Speed Range": "3 to 15 m/min"
    }
  },
  {
    id: "cv-010",
    name: "Custom Line Assembly Conveyor",
    image: "/images/conveyor/IMG_00000130.jpg",
    gallery: [
      "/images/conveyor/IMG_00000130.jpg"
    ],
    desc: "Ergonomic conveyor line with integrated ESD belt and side work tables, perfectly suited for electronic component assembly, testing, and kitting lines.",
    specs: {
      "Belt Material": "ESD Conductive PU Belt",
      "Frame Material": "Aluminium Alloy 6063 T6",
      "Load Capacity": "Up to 100 kg",
      "Drive Type": "Direct Drive Motor"
    }
  },
  {
    id: "cv-011",
    name: "High-Precision Automated Conveyor",
    image: "/images/conveyor/IMG_20140414_142536.jpg",
    gallery: ["/images/conveyor/IMG_20140414_142536.jpg", "/images/conveyor/IMG_20140414_142552.jpg"],
    desc: "Servo motor-driven conveyor system optimized for precise positioning, automated robotic pick-and-place interfacing, and high-speed packaging applications.",
    specs: {
      "Belt Material": "PU Precision Timing Belt",
      "Frame Material": "Aluminium Alloy 6063 T6",
      "Load Capacity": "Up to 50 kg",
      "Drive Type": "Servo Motor Driven",
      "Speed Range": "1 to 35 m/min"
    }
  }
];

const HEAVY_DUTY_APP = [
  {
    id: "hd-001",
    name: "Heavy-Duty Industrial Gantry Structure",
    image: "/images/Have duty app/IMG_2691.JPG",
    gallery: ["/images/Have duty app/IMG_2691.JPG", "/images/Have duty app/IMG_2692.JPG"],
    desc: "Engineered multi-axis gantry support system built using premium heavy-duty aluminium profile systems. Offers robust support for robotic arms, automated pick-and-place lines, and heavy-duty structural machinery.",
    specs: {
      "Dimensions": "Custom Layout / On-demand",
      "Load Capacity": "Up to 1500 kg",
      "Profile Series": "80x80 / 90x90 Heavy Extrusions",
      "Fasteners": "High-tensile steel connection bolts",
      "Adjustability": "Adjustable levelling feet M20"
    }
  },
  {
    id: "hd-002",
    name: "Large-Scale Machine Frame Support",
    image: "/images/Have duty app/IMG_2696.JPG",
    gallery: ["/images/Have duty app/IMG_2696.JPG", "/images/Have duty app/IMG_2697.JPG"],
    desc: "High-strength machine bed base structure engineered to handle massive loads and minimize vibrations in precise manufacturing environments.",
    specs: {
      "Dimensions": "Built to customer design/CAD",
      "Load Capacity": "Up to 2000 kg static load",
      "Rigidity": "Enhanced torsional resistance",
      "Joint Type": "Cube Joints / Anchor Connectors"
    }
  },
  {
    id: "hd-003",
    name: "Heavy-Duty Linear Glide Rails",
    image: "/images/Have duty app/IMG_2700.JPG",
    gallery: ["/images/Have duty app/IMG_2700.JPG", "/images/Have duty app/IMG_2701.JPG"],
    desc: "Linear guide rail assembly built with heavy-duty profile extrusion bases, featuring high rigidity and extremely low friction properties.",
    specs: {
      "Rail Length": "Up to 6 meters modular",
      "Dynamic Load": "Up to 500 kg dynamic load",
      "Precision": "High positioning accuracy (~0.05 mm)",
      "Drive Compatibility": "Rack & Pinion / Ball Screw"
    }
  },
  {
    id: "hd-004",
    name: "Automated Assembly Line Support Base",
    image: "/images/Have duty app/IMG_2704.JPG",
    gallery: ["/images/Have duty app/IMG_2704.JPG", "/images/Have duty app/IMG_2705.JPG"],
    desc: "Heavy-duty modular frame designed to support motorized conveyor lines and industrial material sorting stations. Features built-in slots for easy routing of cables and pneumatics.",
    specs: {
      "Load Capacity": "Up to 1200 kg",
      "Height Adjustability": "800–1200 mm",
      "Connections": "T-slot bolts & heavy gussets",
      "Accessories": "Integrated cable duct routing"
    }
  },
  {
    id: "hd-005",
    name: "High-Strength Machine Enclosure Frame",
    image: "/images/Have duty app/IMG_2708.JPG",
    gallery: ["/images/Have duty app/IMG_2708.JPG", "/images/Have duty app/IMG_2709.JPG"],
    desc: "Robust machine enclosure frame system designed to secure robotic automation systems and heavy machining lines. Provides solid safety shielding with clear panel integrations.",
    specs: {
      "Infill Compatibility": "4mm to 10mm Polycarbonate / Mesh panels",
      "Load Capacity": "Self-supporting structure up to 800 kg",
      "Safety Compliance": "DIN EN ISO machine safety guarding ready",
      "Hinges": "Heavy duty zinc die-cast hinges"
    }
  }
];

const HEAVY_DUTY_PROFILES = [
  {
    id: "hp-001",
    name: "Heavy-Duty Support Column Profile",
    image: "/images/Heavy duty profiles/DSC_0005.jpg",
    gallery: ["/images/Heavy duty profiles/DSC_0005.jpg"],
    desc: "Extremely rigid structural support column profile designed to support massive axial and radial loads in multi-axis automation and gantry assemblies.",
    specs: {
      "Dimensions": "80 × 80 mm / 90 × 90 mm series",
      "Weight": "approx. 4.8 kg/m",
      "Slot Width": "10 mm",
      "Inertia": "Ix: 125.4 cm⁴, Iy: 125.4 cm⁴"
    }
  },
  {
    id: "hp-002",
    name: "Heavy-Duty Portal Frame Profile",
    image: "/images/Heavy duty profiles/Portalsystem.jpg",
    gallery: ["/images/Heavy duty profiles/Portalsystem.jpg"],
    desc: "Specialized rectangular heavy-duty extrusion profile for wide spans and high bending moments. Optimized for portal systems and heavy robotic slider bases.",
    specs: {
      "Dimensions": "80 × 160 mm / 90 × 180 mm series",
      "Weight": "approx. 8.2 kg/m",
      "Slot Width": "10 mm",
      "Inertia": "Ix: 852.1 cm⁴, Iy: 242.3 cm⁴"
    }
  },
  {
    id: "hp-003",
    name: "Heavy-Duty Structural Connection Node",
    image: "/images/Heavy duty profiles/Verbindungsknoten.jpg",
    gallery: ["/images/Heavy duty profiles/Verbindungsknoten.jpg"],
    desc: "Premium multi-directional connection joint designed to connect up to three heavy-duty profiles at right angles. Delivers absolute rigidity without needing profile face machining or welding.",
    specs: {
      "Compatibility": "80x80 and 90x90 series profiles",
      "Connection Types": "3-Way / Corner node alignment",
      "Load Limit": "Up to 15000 N shear strength",
      "Torque Limit": "Max 120 Nm fastening torque"
    }
  },
  {
    id: "hp-004",
    name: "Heavy-Duty Angle/Corner Joint",
    image: "/images/Heavy duty profiles/Winkelverbindung.jpg",
    gallery: ["/images/Heavy duty profiles/Winkelverbindung.jpg"],
    desc: "Heavy-duty gusset angle bracket for structural corners. Anti-rotation keys ensure perfect slot alignment, while heavy wall thickness ensures maximum safety under heavy vibration.",
    specs: {
      "Gusset Size": "80 × 80 × 80 mm / 90 × 90 × 90 mm",
      "Fastening Slots": "Slot 10 compatible",
      "Tensile Strength": "Up to 12000 N",
      "Anti-Rotation Tabs": "Built-in (Removable)"
    }
  }
];

const PROFILE_ASSEMBLY_SYSTEM = [
  {
    id: "pas-hmi-enclosure",
    name: "Industrial HMI Control Enclosure",
    image: "/images/HMI Enclosure.png",
    gallery: ["/images/HMI Enclosure.png"],
    desc: "Customizable industrial HMI housing and operator panel enclosure manufactured from anodized aluminium profiles with internal mounting chassis, cooling vents, and swivel support arm.",
    specs: {
      "Enclosure Material": "Extruded Aluminium 6063-T6 with Cast Corner Caps",
      "Protection Class": "IP54 / IP65 Dust and Splash Resistance",
      "Mounting System": "Top / Bottom Swivel Flange, Articulated Support Arm",
      "Display Sizes": "Compatible with 7\" to 24\" Touchscreens & IPCs",
      "Cable Management": "Internal Concealed Ducting through Support Arm",
      "Application": "Machine control interfaces, SCADA terminals, CNC consoles"
    }
  },
  {
    id: "pas-hmi-cabinet",
    name: "Industrial HMI Control Cabinet",
    image: "/images/Hmi cabinet.png",
    gallery: ["/images/Hmi cabinet.png"],
    desc: "Industrial floor-standing electrical HMI control cabinet and operator workstation console constructed with modular anodized aluminium extrusions, hinged maintenance doors, internal DIN-rail mounting plates, and cable management glands.",
    specs: {
      "Construction": "Heavy-Duty Anodized Aluminium 6063-T6 Structural Framework",
      "Cabinet Panels": "Powder-Coated Steel / Transparent Acrylic Inspection Panels",
      "Mounting Options": "Internal Sub-Plates for PLC, Drives & Power Supplies",
      "Access & Security": "Front & Rear Lockable Hinged Access Doors",
      "Protection Standard": "IP54 Industrial Ingress Protection",
      "Mobility / Base": "Heavy-Duty Leveling Feet or Dual-Locking Swivel Casters",
      "Application": "Machine control consoles, electrical distribution cabinets, automation lines"
    }
  },
  {
    id: "pas-001",
    name: "Automated CNC Work Cell",
    image: "/images/Profile Assembly System/CNC-Automat 1.jpg",
    gallery: ["/images/Profile Assembly System/CNC-Automat 1.jpg", "/images/Profile Assembly System/CNC-Automat 2.jpg"],
    desc: "Advanced automated CNC work cell featuring transparent protective screens, integrated sliding door panels, and heavy-duty profile support base frames.",
    specs: {
      "Dimensions": "Custom Layout",
      "Profile Series": "40x40 / 40x80 / 80x80",
      "Infill Option": "Transparent Polycarbonate panels",
      "Automation Ready": "Yes"
    }
  },
  {
    id: "pas-002",
    name: "Linear Portal System (JET Series)",
    image: "/images/Profile Assembly System/JET 1.jpg",
    gallery: ["/images/Profile Assembly System/JET 1.jpg", "/images/Profile Assembly System/JET 2.jpg"],
    desc: "Multi-axis linear portal system designed for pick-and-place lines, automated packaging, and assembly operations. Built on standardized sliding guides and high-strength profile beams.",
    specs: {
      "Axes": "X-Y-Z multi-axis alignment",
      "Profile Series": "80x80 and 80x160 series",
      "Linear Accuracy": "approx. 0.1 mm",
      "Stroke Length": "Up to 3000 mm"
    }
  },
  {
    id: "pas-003",
    name: "Cleanroom Enclosure System",
    image: "/images/Profile Assembly System/Reinraum.jpg",
    gallery: ["/images/Profile Assembly System/Reinraum.jpg", "/images/Profile Assembly System/Reinraum_Dach.jpg"],
    desc: "Modular cleanroom enclosure system designed to create dust-free micro-environments. Anodized profile frames and ESD polycarbonate sheets prevent particles build-up.",
    specs: {
      "Roof Option": "Reinforced cleanroom ceiling panel ready",
      "Filtration": "FFU (Filter Fan Unit) integration ready",
      "Sealing": "Cleanroom grade silicone seals",
      "Dimensions": "Modular, scalable layout"
    }
  },
  {
    id: "pas-004",
    name: "Modular Production Assembly (Mennekes)",
    image: "/images/Profile Assembly System/Mennekes01.jpg",
    gallery: ["/images/Profile Assembly System/Mennekes01.jpg", "/images/Profile Assembly System/Mennekes02.jpg"],
    desc: "Custom production line assembly framework utilizing modular profiles. Designed to integrate tools, parts bins, air supply, and lighting overhead for streamlined operations.",
    specs: {
      "Layout Type": "Linear production line / Custom workstations",
      "Profile Series": "40x40 / 40x80",
      "Accessories": "Integrated air lines, tool hangers, power ducts",
      "Ergonomics": "Adjustable heights and shelves"
    }
  },
  {
    id: "pas-005",
    name: "Ergonomic Workbenches & Assembly Tables",
    image: "/images/Profile Assembly System/Werkbank.jpg",
    gallery: ["/images/Profile Assembly System/Werkbank.jpg", "/images/Profile Assembly System/Werbank_detail.jpg"],
    desc: "Premium industrial workbench configuration with integrated ESD laminate surface, overhead tool rail, adjustable shelves, and steel pegboards for parts organization.",
    specs: {
      "Load Capacity": "Up to 500 kg static load",
      "Dimensions": "1600 x 800 mm / Custom height",
      "Feet": "M12 adjustable leveling feet",
      "Pegboard": "Integrated steel pegboard ready"
    }
  },
  {
    id: "pas-006",
    name: "Industrial Lift & Multilift Systems",
    image: "/images/Profile Assembly System/Lift.jpg",
    gallery: ["/images/Profile Assembly System/Lift.jpg", "/images/Profile Assembly System/Lift_Motoranbindung.jpg"],
    desc: "Motorized lifting mechanism built using structural profiles and precision guide bearings. Ideal for height-adjustable tables, vertical lifts, and material handling systems.",
    specs: {
      "Stroke": "Up to 1200 mm stroke",
      "Load Capacity": "Up to 300 kg lifting capacity",
      "Drive": "24V DC motor with limit switches",
      "Guide Type": "T-slot roller guides"
    }
  },
  {
    id: "pas-007",
    name: "Control Cabinet Framing (MesKab)",
    image: "/images/Profile Assembly System/MesKab01a.jpg",
    gallery: ["/images/Profile Assembly System/MesKab01a.jpg", "/images/Profile Assembly System/MesKab01b.jpg"],
    desc: "High-durability operator console and PLC cabinet frame system using lightweight extrusion profiles. Allows custom panel positioning and electrical equipment integration.",
    specs: {
      "Frame Series": "30x30 / 40x40 profile structure",
      "Enclosure Class": "IP54 panel integration ready",
      "Panel Options": "Powder coated steel / Polycarbonate panels",
      "Mounting": "Internal chassis subplates ready"
    }
  },
  {
    id: "pas-008",
    name: "Heavy Duty Cable Duct Systems",
    image: "/images/Profile Assembly System/Kabelkanal.jpg",
    gallery: [
      "/images/Profile Assembly System/Kabelkanal.jpg",
      "/images/Profile Assembly System/Kabelkanal_Trennstege.jpg"
    ],
    desc: "Premium industrial cable routing system made of anodized aluminium profiles. Snap-on covers and internal dividers provide clean and organized routing for electrical and pneumatic lines.",
    specs: {
      "Dimensions": "Custom channel size options",
      "Sealing": "Snap-on aluminium cover profiles",
      "Separators": "Internal separation dividers"
    }
  },
  {
    id: "pas-009",
    name: "Exhibition & Showroom Truss Displays",
    image: "/images/Profile Assembly System/Messe02.jpg",
    gallery: ["/images/Profile Assembly System/messe01.jpg", "/images/Profile Assembly System/Messe02.jpg"],
    desc: "Highly modular truss towers and display stands designed for trade shows and exhibitions. Easy to dismantle, lightweight to ship, and reconfigurable for various booth sizes.",
    specs: {
      "Structure Type": "Truss towers, cubes, pyramids",
      "Assembly Type": "T-slot bolts and quick-connectors",
      "Weight": "Lightweight, modular structure",
      "Load": "Medium load capacity for banners and screens"
    }
  },
  {
    id: "pas-010",
    name: "Automated Cutting & Plotter Systems",
    image: "/images/Profile Assembly System/expert_cutter.jpg",
    gallery: ["/images/Profile Assembly System/expert_cutter.jpg", "/images/Profile Assembly System/expert_cutter_1.jpg"],
    desc: "High-precision framework designed for industrial cutting tables and CNC plotting systems. Rigid construction guarantees high accuracy during fast dynamic gantry movements.",
    specs: {
      "Bed Size": "Custom cutting bed sizes",
      "Gantry Drive": "Precision timing belt driven",
      "Vibration Damping": "Integrated anti-vibration leveling mounts"
    }
  },
  {
    id: "pas-011",
    name: "Safety Enclosures & Sliding Gates",
    image: "/images/Profile Assembly System/Tor01.jpg",
    gallery: ["/images/Profile Assembly System/Tor01.jpg", "/images/Profile Assembly System/Tor02.jpg"],
    desc: "Sliding gate panels and protective fencing modules made of structural profiles. Seamlessly integrates with sliding tracks and safety sensors to safeguard operator areas.",
    specs: {
      "DoorStyle": "Hinged / Sliding doors / Counter-balanced lift gates",
      "SafetySwitches": "Integrated mounting plates for safety interlocks",
      "MeshOption": "Wire mesh / Polycarbonate infill options"
    }
  },
  {
    id: "pas-012",
    name: "Modular Tube Connection Systems",
    image: "/images/Profile Assembly System/Verbindung Kreuzklemme.jpg",
    gallery: ["/images/Profile Assembly System/Verbindung Kreuzklemme.jpg", "/images/Profile Assembly System/Verbindung_Kreuzklemmstueck_mit_Alurohren.jpg"],
    desc: "Lean modular tube system consisting of anodized aluminium pipes and heavy-duty connection clamps. Ideal for rapid assembly of custom gravity flow racks and parts kitting carts.",
    specs: {
      "Diameter": "28 mm / 40 mm series",
      "ClampTypes": "Cross-clamp, parallel clamp, elbow clamp",
      "Assembly": "Simple single-bolt clamping"
    }
  },
  {
    id: "pas-013",
    name: "High-Precision Vacuum Machine Frames (von Ardenne)",
    image: "/images/Profile Assembly System/von_Ardenne_1.tif",
    gallery: [
      "/images/Profile Assembly System/von_Ardenne_1.tif",
      "/images/Profile Assembly System/von_Ardenne_2.tif"
    ],
    desc: "High-stiffness frames custom engineered to support large vacuum chambers and precision thin-film coating equipment. Prevents structural deflections under heavy loads.",
    specs: {
      "ProfileSeries": "80x80 / 80x160 / 90x90 heavy profiles",
      "Alignment": "High precision machined surfaces",
      "VacuumReady": "Yes (Low outgassing properties)"
    }
  },
  {
    id: "pas-014",
    name: "Custom Assembly Station Frames",
    image: "/images/Profile Assembly System/DSC_0004.jpg",
    gallery: ["/images/Profile Assembly System/0100.jpg", "/images/Profile Assembly System/Bauerrichter.jpg"],
    desc: "Modular structure frames designed for custom assembly operations. Infinite slot adjustability allows rapid customization of tool holders and material trays.",
    specs: {
      "LoadCapacity": "Up to 400 kg",
      "AccessoriesOption": "Integrated parts organizers, light bars",
      "Adjustability": "T-slot slot mounting for infinite accessories"
    }
  },
  {
    id: "pas-015",
    name: "Specialized Sortation & Packaging Machinery",
    image: "/images/Profile Assembly System/Sortierer.jpg",
    gallery: ["/images/Profile Assembly System/Sortierer.jpg", "/images/Profile Assembly System/Speichen.jpg"],
    desc: "Specialized sorting machine base and superstructure assemblies utilizing modular structural profiles. Designed for packaging lines, bottling lines, and parts separation machinery.",
    specs: {
      "MotorSpeed": "Variable speeds (Variable Controller)",
      "Drive": "Precision timing belt / Roller chains",
      "Infill": "Polycarbonate panels / ESD shielding"
    }
  }
];

const FINISHING_SYSTEMS = [
  {
    id: "fn-001",
    name: "Industrial Edge Finishing Trim",
    image: "/images/feneshing/Picture 459.jpg",
    gallery: [
      "/images/feneshing/Picture 459.jpg",
      "/images/feneshing/Picture 460.jpg"
    ],
    desc: "Highly durable NBR rubber edge finishing trim designed to protect operator hands from sharp cuts and seal the gaps around panels or doors.",
    specs: {
      "Profile Compatibility": "Compatible with 40-series and 45-series profiles",
      "Hardness": "approx. 70 Shore A",
      "Temperature Range": "-30°C to +80°C",
      "UV Resistance": "Excellent"
    }
  },
  {
    id: "fn-002",
    name: "Modular End Cap Cover Profile",
    image: "/images/feneshing/Picture 476.jpg",
    gallery: ["/images/feneshing/Picture 476.jpg", "/images/feneshing/Picture 477.jpg"],
    desc: "Modular snap-on end caps to cover the raw cut surfaces of aluminium profiles. Provides safety, seals the cavity, and enhances aesthetic appearance.",
    specs: {
      "Dimensions": "40x40 mm / 40x80 mm / 80x80 mm",
      "Fastening": "Push-fit into profile center holes",
      "Features": "Prevents dust accumulation inside profile cavity"
    }
  },
  {
    id: "fn-003",
    name: "Safety Corner Cover Cap",
    image: "/images/feneshing/Picture 713.jpg",
    gallery: [
      "/images/feneshing/Picture 713.jpg",
      "/images/feneshing/Picture 715.jpg"
    ],
    desc: "Soft rounded corner covers that clip directly onto corner bracket intersections. High-visibility design alerts personnel and cushions impacts.",
    specs: {
      "Angles": "2-Way / 3-Way corner joints",
      "Impact Resistance": "High mechanical impact absorption",
      "Colours": "Safety Yellow / Industrial Black"
    }
  },
  {
    id: "fn-004",
    name: "Aluminium Profile Cover Strip",
    image: "/images/feneshing/Picture 1049.jpg",
    gallery: [
      "/images/feneshing/Picture 1049.jpg",
      "/images/feneshing/Picture 1050.jpg"
    ],
    desc: "Snap-in cover strips designed to fill empty profile T-slots. Prevents dirt buildup, securely fastens panel elements, and organizes cables within slots.",
    specs: {
      "Slot Width": "8 mm / 10 mm",
      "Length": "2000 mm / Roll length custom",
      "Snap-in Force": "approx. 15 N"
    }
  },
  {
    id: "fn-005",
    name: "Heavy Duty Slot Sealing Profile",
    image: "/images/feneshing/Picture 1052.jpg",
    gallery: ["/images/feneshing/Picture 1052.jpg", "/images/feneshing/Picture 1054.jpg"],
    desc: "Elastic TPE sealing strip designed to seal unused slots under high mechanical wear and chemical exposure. Ideal for CNC router beds and heavy automation lines.",
    specs: {
      "Slot Width": "10 mm",
      "Chemical Resistance": "Resistant to oils, grease, and mild acids",
      "Durability": "Heavy wear usage rating"
    }
  },
  {
    id: "fn-006",
    name: "T-Slot Slider Finishing Profile",
    image: "/images/feneshing/Picture 1059.jpg",
    gallery: ["/images/feneshing/Picture 1059.jpg", "/images/feneshing/Picture 1060.jpg"],
    desc: "Low-friction POM slider cover profile. Allows parts to slide smoothly inside extrusion T-slots without oil, functioning as a clean linear pathway guide.",
    specs: {
      "Friction Coefficient": "0.15 against steel",
      "Profile Compatibility": "8 mm / 10 mm T-slot slots",
      "Max Load": "200 N dynamic slider limit"
    }
  },
  {
    id: "fn-007",
    name: "Modular Protective Edge Guard",
    image: "/images/feneshing/Picture 253.jpg",
    gallery: ["/images/feneshing/Picture 253.jpg"],
    desc: "EPDM rubber edge guard with an embedded steel clip core to deliver massive gripping power on metal plates, acrylic guards, and wire meshes.",
    specs: {
      "Grip Range": "1.5 mm to 4.0 mm sheet thickness",
      "Bending Radius": "Min 50 mm",
      "Resistance": "Ozone and weathering proof"
    }
  },
  {
    id: "fn-008",
    name: "Structural Radius Cover Profile",
    image: "/images/feneshing/Picture 583.jpg",
    gallery: ["/images/feneshing/Picture 583.jpg"],
    desc: "Specially designed radius profile trim to cover square profile joints and create smooth, rounded corners. Perfect for hygienic cleanrooms and display frames.",
    specs: {
      "Radius": "R30 / R40 corner compatibility",
      "Assembly Type": "Snap-on clips",
      "Finish Option": "Silver Matte Anodized"
    }
  },
  {
    id: "fn-009",
    name: "Decorative Cover Profile Strip",
    image: "/images/feneshing/Picture 1019.jpg",
    gallery: ["/images/feneshing/Picture 1019.jpg"],
    desc: "Bright warning color snap-in profile covers used to emphasize hazard areas, label machinery components, and seal slots from dust ingress.",
    specs: {
      "Slot Width": "8 mm Slot 8 compatibility",
      "Installation": "Manual snap-in",
      "UV Durable": "Yes"
    }
  }
];

const PROTECTION_SYSTEMS = [
  {
    id: "pr-sys-robot-fencing",
    name: "Robotic Cell Safety Fencing",
    image: "/images/Robot safety fencing.png",
    gallery: ["/images/Robot safety fencing.png"],
    desc: "Modular industrial perimeter safety guarding fence system for robotic cells, automated machinery, and hazardous manufacturing zones, with robust aluminium frame posts, steel mesh infill, and safety switch integration.",
    specs: {
      "Post Dimensions": "40x40 / 40x80 / 45x45 mm Heavy Anodized Aluminium",
      "Mesh Specification": "40x40 mm Welded Steel Wire Mesh / Polycarbonate",
      "Standard Heights": "1800 mm, 2000 mm, 2200 mm Modular Panels",
      "Door Options": "Hinged Single/Double Doors, Linear Sliding Safety Gates",
      "Safety Standards": "Fully compliant with ISO 14120 and ISO 13857 safety norms",
      "Accessory Ready": "Pre-drilled mounting for safety interlock switches & light curtains",
      "Application": "Industrial robot cells, automated welding stations, conveyor perimeter guarding"
    }
  },
  {
    id: "pr-sys-01",
    name: "GMS Series Modular Guarding",
    image: "/Protection System/GMS 01.jpg",
    gallery: ["/Protection System/GMS 01.jpg", "/Protection System/GMS 02a.jpg"],
    desc: "Standardized perimeter guarding safety fence system. Fast modular connections allow quick layout changes on production floors.",
    specs: {
      "Dimensions": "Modular Heights up to 2200 mm",
      "Mesh Spacing": "40x40 mm wire grid",
      "Safety Distance": "Compliant with ISO 13857 guidelines",
      "Features": "Integrated safety locks and hinge mounts"
    }
  },
  {
    id: "pr-sys-02",
    name: "Handling Automation Guards",
    image: "/Protection System/Handlingautomat 1.jpg",
    gallery: [
      "/Protection System/Handlingautomat 1.jpg",
      "/Protection System/Handlingautomat 2.jpg"
    ],
    desc: "Premium machine guard enclosure featuring overhead slider doors and electrical interlock mounts to safeguard fast-moving pneumatic actuators.",
    specs: {
      "Axes Guarding": "Fully covers high speed 3-axis actuators",
      "Access Types": "Double sliding doors / safety light curtain ready",
      "Vibration Absorption": "Built-in rubber isolation dampers"
    }
  },
  {
    id: "pr-sys-03",
    name: "Hella Light-Guarding Partition",
    image: "/Protection System/Hella1.jpg",
    gallery: [
      "/Protection System/Hella1.jpg",
      "/Protection System/Hella2.jpg"
    ],
    desc: "Mobile screen partition that provides high optical transparency while protecting operators from dust, flying chips, or sparks.",
    specs: {
      "Thickness": "4mm thick transparent screens",
      "Height": "1800 mm standing height partition",
      "Mobility": "Equipped with dual lockable swivel castors"
    }
  },
  {
    id: "pr-sys-04",
    name: "KLW Hood Enclosure",
    image: "/Protection System/KLW-Haube 1.jpg",
    gallery: [
      "/Protection System/KLW-Haube 1.jpg",
      "/Protection System/KLW-Haube 2.jpg"
    ],
    desc: "Pneumatic/gas-assisted lifting hood enclosure. Ideal for protecting tabletop processes, testing labs, or containing minor noise sources.",
    specs: {
      "Opening Angle": "Up to 85° hood rotation",
      "Support": "Dual heavy load gas springs",
      "Seal": "Rubber lip dust seal around mating faces"
    }
  },
  {
    id: "pr-sys-05",
    name: "Messeexponat Demo Safety Cell",
    image: "/Protection System/Messeexponat 1.jpg",
    gallery: ["/Protection System/Messeexponat 1.jpg", "/Protection System/Messeexponat 2.jpg"],
    desc: "High-finish demo cabinet designed for showrooms and trade exhibit cells. Offers maximum transparency and clean internal wire management.",
    specs: {
      "Visibility": "360-degree full glass view",
      "Safety Interlocks": "Safety switch mount slots ready",
      "Cable Routing": "Integrated profile wiring channels"
    }
  },
  {
    id: "pr-sys-06",
    name: "Pries-Horstmann Heavy Machinery Shield",
    image: "/Protection System/Pries-Horstmann 1.jpg",
    gallery: ["/Protection System/Pries-Horstmann 1.jpg", "/Protection System/Pries-Horstmann 2.jpg"],
    desc: "Extreme strength machine barrier guarding built to withstand high mechanical impact forces. Includes heavy steel anchoring plates for solid floor securing.",
    specs: {
      "Impact Rating": "Designed to absorb up to 5000 Joules",
      "Profile Series": "80x80 and 80x160 framing",
      "Floor Mount": "Heavy steel anchor footplates"
    }
  },
  {
    id: "pr-sys-07",
    name: "Steinbach Errani Machinery Guarding Line",
    image: "/Protection System/Steinbach Errani 01a.jpg",
    gallery: ["/Protection System/Steinbach Errani 01a.jpg", "/Protection System/Steinbach Errani 01b.jpg"],
    desc: "Highly modular automated line safety guarding system. Standardized hinges, handles, sliding tracks, and panel mounts simplify machine enclosure construction.",
    specs: {
      "Length": "Modular custom configurations",
      "Door Types": "Hinged, double folding, and counterweighted vertical gates",
      "Infill Compatibility": "4mm Polycarbonate / 5mm Acrylic sheets"
    }
  },
  {
    id: "pr-sys-08",
    name: "Curved Protection Enclosure",
    image: "/Protection System/gebogene Schutzumhausung.jpg",
    gallery: [
      "/Protection System/gebogene Schutzumhausung.jpg",
      "/Protection System/gebogene Schutzumhausung 1.jpg"
    ],
    desc: "Sleek curved machine enclosure incorporating bended profiles and matching thermoformed clear panes. Maximizes operator visibility and floor ergonomics.",
    specs: {
      "Radius Option": "Standard curved corners",
      "Door Option": "Integrated curved sliding door",
      "Features": "Smooth visual aesthetics, ergonomic round design"
    }
  },
  {
    id: "pr-sys-09",
    name: "Alec Custom Guarding Enclosure",
    image: "/Protection System/Alec01.jpg",
    gallery: [
      "/Protection System/Alec01.jpg",
      "/Protection System/alec03.jpg"
    ],
    desc: "Tailored machine guarding enclosure offering customizable mesh and window configurations to fit specific automation cell layouts.",
    specs: {
      "Dimensions": "Custom height up to 2000 mm",
      "Infill": "Plexiglass + Wire grid combination",
      "Legs": "Leveling feet / Castors convertible"
    }
  },
  {
    id: "pr-sys-10",
    name: "Standard Security Guard Fencing",
    image: "/Protection System/Schutzzaun.jpg",
    gallery: ["/Protection System/Schutzzaun.jpg"],
    desc: "Standardized safety wire-mesh fencing panel. Fast mount connectors secure grid panels within the profile slots in minutes.",
    specs: {
      "Grid Size": "40 × 40 mm",
      "Wire Thickness": "3.0 mm galvanized steel",
      "Installation": "Standard T-slot clamp brackets"
    }
  },
  {
    id: "pr-sys-11",
    name: "Mobile Safety Protection Trolley",
    image: "/Protection System/Schutzwagen_masa_henke.jpg",
    gallery: ["/Protection System/Schutzwagen_masa_henke.jpg"],
    desc: "Mobile barrier screen frame on wheels. Enables swift deployment of spark and fluid shields during repair and maintenance operations.",
    specs: {
      "Castors": "4 Swivel Castors (2 with brakes)",
      "Weight": "approx. 18 kg",
      "Screen Option": "ESD safe / Welding tint safety screen ready"
    }
  },
  {
    id: "pr-sys-12",
    name: "BMR Machine Shielding",
    image: "/Protection System/BMR.jpg",
    gallery: ["/Protection System/BMR.jpg"],
    desc: "Compact machine shield designed for machining environments. Heavy-duty transparent shield guards operator from cutting fluids and flying debris.",
    specs: {
      "Thickness": "6mm impact polycarbonate panel",
      "Fitting": "Direct profile slot inlay",
      "Seal": "Rubber seals included"
    }
  },
  {
    id: "pr-sys-13",
    name: "Gaemeler Safety Enclosure",
    image: "/Protection System/Gaemeler.jpg",
    gallery: ["/Protection System/Gaemeler.jpg"],
    desc: "Rigid machine frame structure designed to isolate high vibration stamping and ultrasonic assembly tools while maintaining clear view.",
    specs: {
      "Load Option": "Supports overhead tool suspenders",
      "Feet": "M16 anchor bolts ready",
      "Infill": "Impact grade PMMA panels"
    }
  },
  {
    id: "pr-sys-14",
    name: "Hobby Industrial Shield",
    image: "/Protection System/Hobby01.jpg",
    gallery: ["/Protection System/Hobby01.jpg"],
    desc: "Compact tabletop machine enclosure. Easy front lifting sash door allows comfortable access to workstation contents.",
    specs: {
      "Weight": "approx. 12 kg",
      "Dimensions": "Custom Desktop size",
      "Door": "Front lifting sash door with counterweights"
    }
  },
  {
    id: "pr-sys-15",
    name: "Rutholzer Special Protection Frame",
    image: "/Protection System/Rutholzer.jpg",
    gallery: ["/Protection System/Rutholzer.jpg"],
    desc: "Stiffened protection frame system custom engineered to wrap around high-load vertical lifts and robotic conveyor intersections.",
    specs: {
      "Structural Rigidity": "High load gusset plate reinforcement",
      "Slat Spacing": "Adjustable slat rails",
      "Impact Absorption": "Excellent safety load damping"
    }
  }
];

const CATEGORIES = [
  { id: "all",          label: "All Products",            count: ALUMINIUM_PROFILES.length + FASTENERS.length + ACCESSORIES.length + WORKSTATIONS.length + PIPE_JOINT.length + PROFILE_APP.length + BELT_CONVEYORS.length + HEAVY_DUTY_APP.length + HEAVY_DUTY_PROFILES.length + PROFILE_ASSEMBLY_SYSTEM.length + FINISHING_SYSTEMS.length + PROTECTION_SYSTEMS.length },
  { id: "aluminium",    label: "Aluminium Profiles",      count: ALUMINIUM_PROFILES.length },
  { id: "protection-systems",label: "Protection Systems", count: PROTECTION_SYSTEMS.length },
  { id: "finishing-systems",label: "Finishing Systems",   count: FINISHING_SYSTEMS.length },
  { id: "profile-assembly-system",label: "Profile Assembly Systems", count: PROFILE_ASSEMBLY_SYSTEM.length },
  { id: "heavy-duty-profiles",label: "Heavy Duty Profiles", count: HEAVY_DUTY_PROFILES.length },
  { id: "heavy-duty-app",label: "Heavy Duty Applications", count: HEAVY_DUTY_APP.length },
  { id: "belt-conveyors",label: "Belt Conveyors",          count: BELT_CONVEYORS.length },
  { id: "workstations", label: "Workstations & Solutions", count: WORKSTATIONS.length },
  { id: "pipe-joint",   label: "Pipe & Joint Systems",    count: PIPE_JOINT.length },
  { id: "profile-app",  label: "Profile Applications",    count: PROFILE_APP.length },
  { id: "fasteners",    label: "Fasteners & Connectors",  count: FASTENERS.length },
  { id: "accessories",  label: "Accessories",             count: ACCESSORIES.length },
];

function getProducts(catId) {
  if (catId === "all")          return [...ALUMINIUM_PROFILES, ...BELT_CONVEYORS, ...HEAVY_DUTY_APP, ...HEAVY_DUTY_PROFILES, ...PROFILE_ASSEMBLY_SYSTEM, ...FINISHING_SYSTEMS, ...PROTECTION_SYSTEMS, ...WORKSTATIONS, ...PIPE_JOINT, ...PROFILE_APP, ...FASTENERS, ...ACCESSORIES];
  if (catId === "aluminium")    return ALUMINIUM_PROFILES;
  if (catId === "protection-systems") return PROTECTION_SYSTEMS;
  if (catId === "finishing-systems") return FINISHING_SYSTEMS;
  if (catId === "profile-assembly-system") return PROFILE_ASSEMBLY_SYSTEM;
  if (catId === "heavy-duty-profiles") return HEAVY_DUTY_PROFILES;
  if (catId === "heavy-duty-app") return HEAVY_DUTY_APP;
  if (catId === "belt-conveyors") return BELT_CONVEYORS;
  if (catId === "workstations") return WORKSTATIONS;
  if (catId === "pipe-joint")   return PIPE_JOINT;
  if (catId === "profile-app")  return PROFILE_APP;
  if (catId === "fasteners")    return FASTENERS;
  return ACCESSORIES;
}

/* ─── PRODUCT IMAGE WITH FALLBACK ─── */
function ProductImage({ src, alt }) {
  const [err, setErr] = useState(false);
  if (!src || err) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-slate-300/60 flex items-center justify-center">
            <LayoutGrid size={22} className="text-slate-400" />
          </div>
          <p className="text-[10px] text-slate-400 font-medium px-2">{alt}</p>
        </div>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErr(true)}
      className="w-full h-full transition-transform duration-500 group-hover:scale-108 object-contain p-2"
      style={{ transform: "scale(1)", transition: "transform 0.5s ease" }}
    />
  );
}

/* ─── DETAILS MODAL ─── */
function DetailsModal({ product, onClose, navigate }) {
  const [activeTab, setActiveTab] = useState("3d");
  const [sliderIdx, setSliderIdx] = useState(0);
  if (!product) return null;

  // Reset slider when product changes
  const gallery = (product.gallery && product.gallery.length > 0)
    ? product.gallery
    : product.image ? [product.image] : [];
  const hasGallery = gallery.length > 1;

  const prevSlide = () => setSliderIdx(i => (i - 1 + gallery.length) % gallery.length);
  const nextSlide = () => setSliderIdx(i => (i + 1) % gallery.length);

  const categoryLabel = ALUMINIUM_PROFILES.find(p => p.id === product.id)
    ? "Aluminium Profiles"
    : PROTECTION_SYSTEMS.find(p => p.id === product.id)
    ? "Protection Systems"
    : FINISHING_SYSTEMS.find(p => p.id === product.id)
    ? "Finishing Systems"
    : PROFILE_ASSEMBLY_SYSTEM.find(p => p.id === product.id)
    ? "Profile Assembly Systems"
    : HEAVY_DUTY_PROFILES.find(p => p.id === product.id)
    ? "Heavy Duty Profiles"
    : HEAVY_DUTY_APP.find(p => p.id === product.id)
    ? "Heavy Duty Applications"
    : BELT_CONVEYORS.find(p => p.id === product.id)
    ? "Belt Conveyors"
    : WORKSTATIONS.find(p => p.id === product.id)
    ? "Workstations & Solutions"
    : PIPE_JOINT.find(p => p.id === product.id)
    ? "Pipe & Joint Systems"
    : PROFILE_APP.find(p => p.id === product.id)
    ? "Profile Applications"
    : FASTENERS.find(p => p.id === product.id)
    ? "Fasteners & Connectors"
    : "Accessories";
  const hasDataSheet = !!product.dataSheet;
  const isPhoto = product.id.startsWith("ws") || product.id.startsWith("pj") || product.id.startsWith("pa") || product.id.startsWith("cv") || product.id.startsWith("hd") || product.id.startsWith("hp") || product.id.startsWith("pas") || product.id.startsWith("fn") || product.id.startsWith("pr-sys");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100 flex-shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] bg-primary-900 text-white px-3 py-1 rounded-full">
                  {categoryLabel}
                </span>
                {hasGallery && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                    <Images size={10} />
                    {gallery.length} photos
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-display font-bold text-primary-900 leading-tight">
                {product.name}
              </h1>
            </div>
            <button
              onClick={onClose}
              id="modal-close-btn"
              className="ml-4 flex-shrink-0 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <X size={16} className="text-slate-600" />
            </button>
          </div>

          {/* Tab Bar — only show if dataSheet exists */}
          {hasDataSheet && (
            <div className="flex border-b border-slate-100 px-6 flex-shrink-0">
              <button
                onClick={() => setActiveTab("3d")}
                className={"flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 transition-colors " +
                  (activeTab === "3d"
                    ? "border-primary-900 text-primary-900"
                    : "border-transparent text-slate-400 hover:text-slate-700")}
              >
                <LayoutGrid size={12} /> 3D View
              </button>
              <button
                onClick={() => setActiveTab("datasheet")}
                className={"flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 transition-colors " +
                  (activeTab === "datasheet"
                    ? "border-primary-900 text-primary-900"
                    : "border-transparent text-slate-400 hover:text-slate-700")}
              >
                <FileText size={12} /> Data Sheet
              </button>
            </div>
          )}

          {/* Body */}
          <div className="overflow-y-auto flex-1">
            {/* DATA SHEET TAB */}
            {activeTab === "datasheet" && hasDataSheet ? (
              <div className="flex items-center justify-center bg-slate-50 p-4 min-h-[400px]">
                <img
                  src={product.dataSheet}
                  alt={product.name + " Data Sheet"}
                  className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-md"
                  onError={e => { e.currentTarget.alt = "Data sheet image not found"; }}
                />
              </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              {/* ── IMAGE / GALLERY SLIDER PANE ── */}
              <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center min-h-[260px] sm:min-h-[320px] overflow-hidden">
                {gallery.length > 0 ? (
                  <>
                    {/* Slide image with AnimatePresence */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={sliderIdx}
                        src={gallery[sliderIdx]}
                        alt={product.name + " photo " + (sliderIdx + 1)}
                        className={"w-full h-full min-h-[260px] sm:min-h-[320px] " + (isPhoto ? "object-cover" : "object-contain p-8")}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                        onError={e => { e.currentTarget.style.display = "none"; }}
                      />
                    </AnimatePresence>

                    {/* Arrow buttons — only when gallery has >1 image */}
                    {hasGallery && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-110 z-10"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={16} className="text-slate-700" />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-110 z-10"
                          aria-label="Next image"
                        >
                          <ChevronRight size={16} className="text-slate-700" />
                        </button>

                        {/* Dot indicators */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {gallery.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setSliderIdx(i)}
                              className={"transition-all rounded-full " + (i === sliderIdx
                                ? "w-5 h-1.5 bg-white shadow"
                                : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80")}
                              aria-label={"Go to image " + (i + 1)}
                            />
                          ))}
                        </div>

                        {/* Counter badge */}
                        <div className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-mono px-2 py-0.5 rounded-full z-10">
                          {sliderIdx + 1} / {gallery.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-slate-200 flex items-center justify-center">
                    <LayoutGrid size={32} className="text-slate-400" />
                  </div>
                )}
              </div>

              {/* Specs pane */}
              <div className="p-6 flex flex-col gap-5">
                <p className="text-sm text-slate-600 leading-relaxed">{product.desc}</p>
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 mb-3">
                    Key Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <div key={k} className="bg-slate-50 rounded-xl px-3 py-2.5">
                        <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-0.5">{k}</p>
                        <p className="text-xs font-semibold text-slate-800">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/60 flex-shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-100 transition-colors font-medium"
            >
              Close
            </button>
            <button
              id={"enquiry-modal-" + product.id}
              onClick={() => {
                onClose();
                navigate("/contact?machine=" + encodeURIComponent(product.name));
              }}
              className="px-6 py-2.5 rounded-xl bg-primary-900 text-white text-sm font-semibold hover:bg-primary-800 transition-colors flex items-center gap-2"
            >
              <Send size={13} />
              Send Enquiry
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── PRODUCT CARD ─── */
function ProductCard({ product, onDetails, index }) {
  const navigate = useNavigate();
  const hasImage = product.image !== null && product.image !== undefined;
  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-blue-100 hover:border-blue-400 transition-all duration-300 flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.5), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-slate-50" style={{ height: hasImage ? "260px" : "150px" }}>
        <ProductImage src={product.image} alt={product.name} />
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[10px] font-semibold text-blue-900 px-3 py-1 rounded-full border border-blue-200 shadow-sm">
          {ALUMINIUM_PROFILES.find(p => p.id === product.id) ? "Aluminium Profiles" : PROTECTION_SYSTEMS.find(p => p.id === product.id) ? "Protection Systems" : FINISHING_SYSTEMS.find(p => p.id === product.id) ? "Finishing Systems" : PROFILE_ASSEMBLY_SYSTEM.find(p => p.id === product.id) ? "Profile Assembly Systems" : HEAVY_DUTY_PROFILES.find(p => p.id === product.id) ? "Heavy Duty Profiles" : HEAVY_DUTY_APP.find(p => p.id === product.id) ? "Heavy Duty Applications" : BELT_CONVEYORS.find(p => p.id === product.id) ? "Belt Conveyors" : WORKSTATIONS.find(p => p.id === product.id) ? "Workstations" : PIPE_JOINT.find(p => p.id === product.id) ? "Pipe & Joint" : PROFILE_APP.find(p => p.id === product.id) ? "Profile App" : FASTENERS.find(p => p.id === product.id) ? "Fasteners" : "Accessories"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h1 className="font-display font-bold text-[15px] text-[#0f172a] mb-1.5 leading-tight group-hover:text-blue-600 transition-colors">
          {product.name}
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-3">{product.desc}</p>

        {/* Quick spec tags */}
        {product.specs["Weight / M"] && (
          <div className="flex flex-wrap gap-2 mt-3 mb-4">
            <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-lg font-mono font-semibold">
              {product.specs["Weight / M"]}
            </span>
            {product.specs["Ix"] && (
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-lg font-mono">
                Ix: {product.specs["Ix"]}
              </span>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mt-auto pt-2">
          <button
            id={"details-btn-" + product.id}
            onClick={() => onDetails(product)}
            className="flex-1 flex items-center justify-center gap-1.5 border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 rounded-xl hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all"
          >
            <Info size={13} />
            Details
          </button>
          <button
            id={"enquiry-btn-" + product.id}
            onClick={() => navigate("/contact?machine=" + encodeURIComponent(product.name))}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/30"
          >
            Enquiry
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN PAGE ─── */
/* Map navbar slug values → Products page category IDs */
const SLUG_TO_CAT = {
  "aluminium-profiles":   "aluminium",
  "connecting-elements":  "accessories",
  "pipe-joint-systems":   "pipe-joint",
  "workstations":         "workstations",
  "profile-applications": "profile-app",
  "belt-conveyors":       "belt-conveyors",
  "heavy-duty-app":       "heavy-duty-app",
  "heavy-duty-profiles":  "heavy-duty-profiles",
  "profile-assembly-system": "profile-assembly-system",
  "finishing-systems":    "finishing-systems",
  "protection-systems":   "protection-systems",
};

const ITEMS_PER_PAGE = 12;

export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /* Sync category from URL whenever the query param changes */
  useEffect(() => {
    const slug = searchParams.get("category");
    if (slug && SLUG_TO_CAT[slug]) {
      setActiveCategory(SLUG_TO_CAT[slug]);
    } else {
      setActiveCategory("all");
    }
  }, [searchParams]);

  /* Reset to page 1 whenever category changes */
  useEffect(() => { setCurrentPage(1); }, [activeCategory]);

  const allProducts = getProducts(activeCategory);
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const products = allProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const activeCat = CATEGORIES.find(c => c.id === activeCategory);

  /* Scroll back up when page changes */
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Products Catalogue | SI Technology</title>
        <meta
          name="description"
          content="Explore SI Technology complete product catalogue — Aluminium Profiles, Fasteners & Connectors, and Accessories for modular industrial framing systems."
        />
      </Helmet>

      {/* ─── 1. TOP HERO BANNER SECTION (PRODUCTS CATALOGUE) ─── */}
      <section className="relative overflow-hidden bg-black text-white pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 border-b border-neutral-800">
        {/* Custom Background Image - High Visibility & Brightness */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/products_hero_bg.png"
            alt="SI Technology Products Catalogue"
            className="w-full h-full object-cover object-center opacity-85 filter brightness-105 contrast-105 scale-105"
          />
          {/* Lighter Gradient Overlays so Photo Details and Lights Pop Clearly */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/80 pointer-events-none" />
        </div>

        {/* Grid Lines Pattern & Glowing Ambient White Lighting */}
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none z-1" />
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-slate-300/10 rounded-full blur-3xl pointer-events-none z-1" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Top Breadcrumbs Row (Left-aligned) */}
          <div className="flex items-center justify-start mb-3">
            <nav className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-200 tracking-wide drop-shadow-md">
              <Link to="/" className="hover:text-white transition-colors font-medium">Home</Link>
              <span className="text-slate-400">•</span>
              <span className="text-white font-bold tracking-wider">Products Catalogue</span>
            </nav>
          </div>

          {/* Main Centered Banner Content (Bright White & High Contrast) */}
          <div className="flex flex-col items-center justify-center text-center space-y-3 py-4">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
              Products Catalogue
            </h1>

            <p className="text-white font-semibold text-xs sm:text-base max-w-2xl tracking-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
              Modular Aluminium Extrusions, Precision Fasteners &amp; Accessories for Industrial Automation
            </p>

            {/* Glowing Bright White Accent Line */}
            <div className="w-28 sm:w-40 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full mt-2 shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
          </div>
        </div>
      </section>

      {/* CATALOG BODY */}
      <section className="bg-slate-50 min-h-screen py-10 border-t border-blue-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-7 items-start">

            {/* SIDEBAR */}
            <aside className="hidden lg:block w-64 flex-shrink-0 sticky-sidebar" style={{ height: "calc(100vh - 130px)" }}>
              <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5 h-full flex flex-col overflow-hidden">
                <div className="flex items-center gap-2 mb-5 flex-shrink-0">
                  <Filter size={14} className="text-blue-600" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-blue-900 font-bold">
                    Product Categories
                  </span>
                </div>
                <nav className="space-y-1 overflow-y-auto flex-1 min-h-0 pr-1 scrollbar-thin">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      id={"cat-btn-" + cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={"w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 " + (activeCategory === cat.id ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "text-slate-600 hover:bg-blue-50 hover:text-blue-600")}
                    >
                      <span>{cat.label}</span>
                      <span className={"text-[11px] font-mono font-bold px-2 py-0.5 rounded-full " + (activeCategory === cat.id ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600")}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* MAIN AREA */}
            <div className="flex-1 min-w-0">
              {/* Header bar */}
              <div className="bg-white rounded-2xl border border-blue-100 shadow-sm px-6 py-4 mb-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-600 mb-0.5">Catalog View</p>
                  <h2 className="text-xl font-display font-bold text-[#0f172a]">{activeCat ? activeCat.label : ""}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500 font-light">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, allProducts.length)} of {allProducts.length} Products
                  </span>
                </div>
              </div>

              {/* Mobile horizontally scrollable category pills */}
              <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none -mx-4 px-4">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setCurrentPage(1); }}
                    className={"text-xs font-semibold px-4 py-2.5 rounded-full transition-all shrink-0 cursor-pointer border " + 
                      (activeCategory === cat.id 
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30" 
                        : "bg-white text-slate-600 border-slate-200 hover:bg-blue-50")}
                  >
                    {cat.label} ({cat.count})
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <motion.div
                key={activeCategory + "-" + currentPage}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i}
                    onDetails={setSelectedProduct}
                  />
                ))}
              </motion.div>

              {/* ─── PAGINATION ─── */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10 mb-2">
                  {/* Prev */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-blue-200 bg-white text-slate-600 hover:border-blue-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Page numbers */}
                  {(() => {
                    const pages = [];
                    const delta = 2;
                    let start = Math.max(1, currentPage - delta);
                    let end   = Math.min(totalPages, currentPage + delta);
                    if (end - start < 4) {
                      if (start === 1) end   = Math.min(totalPages, start + 4);
                      else            start = Math.max(1, end - 4);
                    }
                    if (start > 1) {
                      pages.push(
                        <button key={1} onClick={() => goToPage(1)}
                          className="w-10 h-10 rounded-full flex items-center justify-center border border-blue-200 bg-white text-slate-600 text-sm font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 shadow-sm">
                          1
                        </button>
                      );
                      if (start > 2) pages.push(<span key="s" className="text-slate-400 px-1 select-none">…</span>);
                    }
                    for (let p = start; p <= end; p++) {
                      pages.push(
                        <button
                          key={p}
                          onClick={() => goToPage(p)}
                          className={"w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 shadow-sm " +
                            (p === currentPage
                              ? "bg-blue-600 text-white border border-blue-600 scale-110 shadow-md shadow-blue-600/30"
                              : "border border-blue-200 bg-white text-slate-600 hover:border-blue-600 hover:text-blue-600")}
                          aria-current={p === currentPage ? "page" : undefined}
                        >
                          {p}
                        </button>
                      );
                    }
                    if (end < totalPages) {
                      if (end < totalPages - 1) pages.push(<span key="e" className="text-slate-400 px-1 select-none">…</span>);
                      pages.push(
                        <button key={totalPages} onClick={() => goToPage(totalPages)}
                          className="w-10 h-10 rounded-full flex items-center justify-center border border-blue-200 bg-white text-slate-600 text-sm font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 shadow-sm">
                          {totalPages}
                        </button>
                      );
                    }
                    return pages;
                  })()}

                  {/* Next */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 bg-white text-slate-500 hover:border-primary-900 hover:text-primary-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Footer CTA */}
              <div className="mt-12 bg-gradient-to-r from-primary-950 to-primary-800 rounded-2xl p-8 text-center text-white">
                <h3 className="font-display font-bold text-lg xs:text-xl sm:text-2xl mb-2">
                  Looking for a custom solution?
                </h3>
                <p className="text-white/55 text-sm mb-6 max-w-md mx-auto">
                  Our engineers design bespoke aluminium profile structures tailored to your specific automation and framing requirements.
                </p>
                <Link
                  to="/contact"
                  id="custom-quote-btn"
                  className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-bold px-7 py-3 rounded-full transition-colors"
                >
                  Get a Custom Quote
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedProduct && (
        <DetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          navigate={navigate}
        />
      )}
    </>
  );
}
