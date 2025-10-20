import React, { useState } from 'react';
import './InfoSoilThreat.css';

const InfoSoilThreat = ({ visible, onClose, indicator }) => {
  const [closing, setClosing] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendationsClosing, setRecommendationsClosing] = useState(false);

  if (!visible && !closing) {
    return null;
  }

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 400);
  };

  const handleShowRecommendations = () => {
    setShowRecommendations(true);
  };

  const handleCloseRecommendations = () => {
    setRecommendationsClosing(true);
    setTimeout(() => {
      setRecommendationsClosing(false);
      setShowRecommendations(false);
    }, 600);
  };

  // Función para obtener contenido dinámico
  const getIndicatorContent = (indicator) => {
    const contents = {
      'Soil Compaction': {
        title: 'Soil Compaction',
        image: "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759741088/istockphoto-1221232054-612x612_kty2mf.jpg",
        description: 'Soil compaction is a physical process in which soil particles are pressed together, reducing pore space and <b>limiting air and water movement</b>. This leads to decreased <b>porosity, infiltration, and biological activity, affecting root growth and crop productivity.</b><br></br>Topsoil compaction can sometimes be reversed through tillage or biological activity, while <b>subsoil compaction is persistent and long-lasting</b>, making it a critical soil degradation threat in intensive agricultural systems.',
        recommendation: 'Maintaining low soil compaction preserves <b>soil structure, aeration, and water flow</b>. Managing bulk density, clay content, and the SOC/clay ratio helps <b>prevent structural degradation</b>. Reducing machinery traffic, using controlled tillage, and deep-rooted crops improves porosity, supporting root growth, biological activity, and soil productivity.'
      },
      'Soil Biodiversity': {
        title: 'Soil Biodiversity',
        image: "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759821697/56d97a0d72_maonh8.jpg",
        description: ' Soil biodiversity refers to the variety of living organisms in the soil — from <b>microbes (bacteria, fungi, archaea)</b> to <b>mesofauna (nematodes, collembolans)</b> and <b>macrofauna (earthworms, arthropods)</b> — that sustain essential ecosystem functions. These organisms drive nutrient cycling, organic matter decomposition, carbon storage, soil structure formation, and plant health. <br> </br> <b> Biodiversity loss</b> reduces these functions, leading to poorer fertility, lower resilience, and disrupted ecosystem balance. <b> Key pressures include land-use intensification, pollution, organic matter decline, soil sealing, and climate change </b>.',
        recommendation: 'Monitoring soil biodiversity relies on measurable indicators that reflect biological activity and ecosystem functioning. Key variables include <b> microbial biomass and respiration, earthworm and nematode diversity, and enzyme or DNA-based indicators of microbial richness</b>. These metrics provide insight into nutrient cycling, organic matter stability, and soil resilience. Integrating biological data with <b> soil properties such as organic carbon and texture </b> allows for a better understanding of how management practices influence biodiversity and soil health.'
      },
      'Soil Organic Carbon': {
        title: 'Soil Organic Carbon',
        image: "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759822889/ngeo_hero_collections_Jul20-aa081b1cc04e462788eaef23b8e46bff_gn3o9w.jpg",
        description: 'Soil Organic Carbon <b>(SOC)</b> is the carbon component of organic matter in the soil — originating from plant and animal residues, root exudates, and microbial biomass. It is <b>crucial for soil fertility, structure, nutrient retention, and water regulation</b>, and acts as a major <b>carbon sink</b>, helping mitigate climate change.<br> </br>Loss of SOC reduces soil productivity, increases erosion and compaction risk, and decreases resilience to drought and degradation. Key drivers of SOC decline include <b>intensive tillage, removal of residues, low organic inputs, erosion, and land-use change</b>.',
        recommendation: 'Monitoring SOC relies on indicators that reflect both its quantity and stability. The main variables include SOC content and stock, which show how much carbon is stored, and the <b>SOC/clay ratio</b>, a key indicator of soil structure and vulnerability to degradation. <b>Bulk density</b> and the <b>C/N ratio</b> help assess how carbon interacts with soil texture and organic matter turnover. Tracking these parameters allows identification of soils at risk of carbon loss and guides management actions to maintain fertility, structure, and long-term carbon sequestration potential.'
      },
      'Soil pH Balance': {
        title: 'Soil pH Balance',
        image: "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759824773/soil-ph-meter-farmers-fill-600nw-2279512865_wawv8c.webp",
        description: 'Soil pH is a measure of its <b>acidity or alkalinity</b> and is one of the most important chemical indicators of soil health. It is measured on a logarithmic scale from <b>0 to 14</b>, where a value of 7 is <b>neutral</b>. Values below 7 indicate <b>acidity</b>, and values above 7 indicate <b>alkalinity </b>.<br></br>pH directly influences the availability of nutrients for plants (as it affects their solubility), the activity of beneficial microorganisms, and, in extreme cases, can cause <b> toxicity of certain elements such as aluminum (in acidic soils) or deficiencies of others such as iron or zinc (in alkaline soils)</b>.',
        recommendation: 'Within the context of European soil health, <b>Soil pH monitoring</b> is critical because its imbalance represents a major <b>chemical threat</b>. This degradation harms the soils <b>functional properties</b>, thus reducing its capacity to provide essential ecosystem services like crop productivity. To evaluate this risk, the EEA report stresses the use of <b>critical limits or thresholds</b>—specific values that identify the <b>tipping points</b> where soil functions are severely impaired, demanding immediate restorative action.'
      },
      'Soil Pollution': {
        title: 'Soil Pollution',
        image: "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759829314/1_fhhete.webp",
        description: 'Soil Pollution is defined as a major <b>chemical threat</b> that results from the <b>accumulation of contaminants</b> and excess nutrients, leading to soil chemical and biological degradation. This degradation can reduce soil functions like <b>filtering</b> and water storage, and is often responsible for surface water or groundwater pollution. Assessing this threat is based on a <b> risk-based approach</b> that utilizes <b>Soil Screening Values (SSVs)</b> as critical thresholds.<br></br> The ultimate objective of this assessment is the <b>protection of human health </b> and <b>ecosystems</b> (endpoints) by evaluating the concentration of pollutants against acceptable risk levels across different <b>exposure pathways</b> (e.g., soil to food, soil to water).',
        recommendation: 'The implementation of these thresholds across Europe is <b>highly challenging </b> due to the complex interplay of <b>soil functions</b>, diverse site conditions, and varied <b>management practices</b>. As a result, there is <b>no EU consensus on unified critical limits</b>, and national standards remain inconsistent. The report emphasizes that <b>Soil Screening Values (SSVs)</b> must incorporate factors like <b>soil properties</b>, groundwater depth, and local practices (e.g., self-supply gardening) to accurately link pollutant concentration to its eventual impact on endpoints like food quality or human health.'
      },
      'Soil Sealing': {
        title: 'Soil Sealing',
        image: "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759830578/huge_k8bbfa.jpg",
        description: 'Soil Sealing is considered a major <b>physical threat</b> where a land surface is covered by <b>impervious materials</b> such as concrete, asphalt, or buildings. This process, primarily driven by urban sprawl and development, leads to the continued loss of soil and its replacement by artificial surfaces. Critically, in the case of soil sealing, the soil\'s functions are largely and <b>irreversibly lost</b>. This includes the fundamental capacities for:<br><br>1. <b>Water management:</b> Stopping infiltration and storage.<br>2. <b>Gas exchange:</b> Cutting off aeration and respiration.<br>3. <b>Biomass production:</b> Eliminating the habitat for plant and microbial life.',
        recommendation: 'To mitigate soil sealing, it is crucial to implement <b>sustainable urban planning</b>, incorporate <b>green infrastructure</b> (e.g., permeable pavements, green roofs), and protect <b>remaining natural soil areas</b>. Awareness and policy measures are necessary to limit the irreversible loss of soil functions due to artificial surface coverage.'
      }
    };
    return contents[indicator] || contents['Soil Compaction'];
  };

  // Función para obtener recomendaciones detalladas dinámicas
  const getDetailedRecommendations = (indicator) => {
    const recommendations = {
      'Soil Compaction': {
        cards: [
          {
            title: 'Bulk Density (g/cm³):',
            description: 'Mass of oven-dry soil per unit volume. Crucial for converting SOC content into SOC stock and strongly affects aeration, root development and microbial activity.',
            extra:'<b>Method:</b> Drying samples at 105 °C until constant weight to determine dry mass.',
            interpretation: '<b>Interpretation: </b>Bulk density reflects compaction and porosity, two properties central to soil health. Sandy soils usually show higher values (1.4–1.7 g/cm³), loams are moderate (1.2–1.5 g/cm³), clays lower (1.0–1.3 g/cm³), and organic soils very low (<0.9 g/cm³). Healthy soils generally balance strength and porosity; bulk density values above 1.6 g/cm³ restrict root growth and water infiltration, leading to stress for plants and microbes. Values below 1.2 g/cm³ are favourable, indicating loose, aerated soils that sustain biological activity and water movement.',
            color: 'green'
          },
          {
            title: 'SOC/Clay Ratio (Structural Stability Index):',
            description: 'The ratio between organic carbon and clay fraction. It reflects structural stability, resilience against degradation and the soil’s long-term capacity to stabilise carbon.',
            extra:'<b>Method:</b> calculated as SOC (%) ÷ clay (%)',
            interpretation: '<b>Interpretation:</b> The SOC/clay ratio is an effective proxy for soil structural stability and long-term carbon protection. Ratios above 0.10 (1:10) signal that enough organic carbon is associated with the clay fraction to stabilise aggregates and resist erosion. Ratios between 0.05 and 0.10 are typical of many mineral soils and suggest moderate resilience. Ratios below 0.05 indicate vulnerable soils, where organic matter is insufficiently protected and easily lost under tillage or drought. Healthy soils tend to maintain higher ratios, ensuring both physical stability and sustained carbon sequestration potential.',
            color: 'blue'
          },
          {
            title: 'Clay Content (%):',
            description: 'Determines mechanical sensitivity: clay-rich soils are more compactable when wet, but more resistant when dry.',
            extra:'<b>Method:</b> Hydrometer method (Bouyoucos method)',
            interpretation: '<b>Interpretation:</b> Clay content defines many of the soil’s physical and chemical properties. Soils rich in clay are more compactable when wet, but once dry they are harder and more resistant to mechanical stress. High clay content increases nutrient and water retention capacity, as clay minerals provide a large reactive surface for binding cations and organic matter. However, very clay-rich soils (>40–50%) can be prone to waterlogging, swelling and cracking, which complicates root penetration. Sandy soils (<10% clay) have poor nutrient retention but are well aerated.',
            color: 'amber'
          },
          {
            title: 'Air Capacity (AC %):',
            description: ' Air capacity is measured as the percentage of soil volume that remains air-filled after water has drained.',
            extra:'<b>Method:</b> Undisturbed core method combined with pressure plate.',
            interpretation: '<b>Interpretation:</b> Healthy soils usually maintain 10–20% air capacity, which provides sufficient oxygen for roots and microorganisms while still retaining adequate water. Low values (<10%) indicate compaction or excessive water retention, conditions that can cause oxygen stress, reduced root growth and limited microbial activity, especially in clay-rich or poorly drained soils. High values (>25%), often found in sandy soils, indicate very good aeration but also rapid drying and nutrient leaching, which reduces fertility. Thus, optimal air capacity is a balance: enough to ensure oxygen supply, but not so high that soils become drought-prone and infertile.',
            color: 'purple'
          }
        ],
        additionalText: 'Monitor these indicators regularly to maintain optimal soil health and prevent compaction issues. Implement controlled traffic farming and avoid heavy machinery during wet conditions.'
      },
      'Soil Biodiversity': {
        cards: [
          {
            title: 'Microbial Biomass & Respiration:',
            description: 'Measures total microbial activity and carbon cycling capacity. Higher values indicate active soil communities supporting nutrient availability.',
            extra: '<b>Method:</b> Soil respiration assays (CO₂ release measured in incubation chambers).',
            interpretation:'<b>Interpretation:</b> Soil respiration, expressed as mg CO₂ per 100 g of soil per day, reflects how biologically active and fertile a soil is. Very low values (<15 mg) indicate degraded soils with little organic matter and weak microbial life. Moderate levels (26–52 mg) are typical of functioning agricultural soils, showing balanced nutrient cycling. High values (52–105 mg) reflect healthy, biologically rich soils such as grasslands or croplands with organic inputs. When respiration is very high (>105 mg), as in peatlands or freshly amended fields, it signals strong microbial activity but also a risk of rapid carbon loss.',
            color: 'green'
          },
          {
            title: 'Fungi presence:',
            description: 'Reflects soil food web complexity and ecosystem functionality. Diverse populations enhance soil structure and nutrient cycling.',
            extra:'<b>Methods:</b> Serial dilutions - Inoculation on enriched media Isolation on selective/enriched media - Macroscopic and microscopic examination -Literature review / bibliographic research',
            interpretation: '<b>Interpretation:</b> Culturing and examining soil fungi provides valuable insight into soil health. Saprotrophic genera such as Mortierella, Chaetomium and Trichoderma point to active decomposition and nutrient cycling, with Trichoderma also acting as a natural biocontrol agent. Arbuscular mycorrhizal fungi (e.g. Glomeraceae) are key indicators of well-functioning soils, as they improve plant nutrient uptake and resilience. In forests, ectomycorrhizal fungi like Russula or Cortinarius signal strong tree–soil interactions and stable carbon inputs. By contrast, a dominance of pathogens such as Fusarium or Rhizoctonia reveals soil stress and imbalance. Fast-growing decomposers like Aspergillus and Penicillium are common in organic-rich soils, showing strong biological activity but also the risk of rapid carbon loss. Overall, the balance between beneficial fungi and pathogens provides a clear picture of soil vitality and sustainability.',
            color: 'blue'
          },
          {
            title: 'Nematode presence:',
            description: 'Represents trophic diversity and soil food web structure. Links microbial processes with nutrient cycling and ecosystem stability.',
            extra: '<b>Method:</b> Morphological identification of nematodes into trophic groups after Baermann extraction.',
            interpretation:'Interpretation: Different nematode groups represent distinct trophic roles (bacterivores, fungivores, herbivores, predators). A balanced community shows ecosystem stability, with strong links between microbial activity and nutrient cycling. Dominance of plant-parasitic nematodes suggests soil stress, while a diverse trophic structure indicates healthy soils with multiple functional groups. A soil with a high concentration of saprophytes indicates that the bio-community is very active in decomposing dead organic matter such as plant residues, roots, and crop litter.',
            color: 'amber'
          },
          {
            title: 'DNA-based Microbial Richness:',
            description: 'Advanced molecular techniques to assess microbial community diversity and functional potential in soil ecosystems.',
            extra: '<b>Method:</b> Metagenomics or metabarcoding for broader functional and taxonomic insights.',
            interpretation: '<b>Interpretation:</b> DNA sequencing reveals the richness and diversity of microbial taxa. High richness indicates a resilient soil with many functional groups, supporting nutrient turnover and disease suppression. Low richness suggests a simplified ecosystem, more vulnerable to stress and less efficient in cycling organic matter.',
            color: 'purple'
          }
        ],
        additionalText: 'Promote biodiversity through organic amendments, reduced tillage, and cover crops. Avoid excessive pesticides and maintain soil moisture for optimal microbial communities.'
      },
      'Soil Organic Carbon': {
        cards: [
          {
            title: 'SOC content (%) or g C/kg soil:',
            description: 'Core measure of organic carbon in the soil; indicates soil fertility and degradation risk. Directly shows how much carbon is in the fine soil fraction.',
            extra: '<b>Method:</b> Walkley-Black Interpretation: Soil organic carbon content is highly variable, depending on climate, soil type, vegetation and land use. In tropical soils, values are often below 1–2% because high temperatures accelerate decomposition. Mediterranean croplands usually contain 1–3%, while temperate agricultural soils often reach 2–5%, with grasslands exceeding 5% under good management. Organic soils such as peatlands can store over 20–30%. From a soil health perspective, values below 1% are critical and often indicate poor fertility and vulnerability to degradation. Values above 2–3% are generally linked to healthy soils with better nutrient cycling, water retention and resilience.',
            color: 'green'
          },
          {
            title: 'SOC stock (t C/ha):',
            description: 'Represents the total carbon stored in a soil layer; crucial for carbon budgeting and climate impact. Integrates SOC content with depth and bulk density.',
            extra: '<b>Method:</b> SOC stock = SOC content × Bulk density × Depth × Conversion factor ',
            interpretation: '<b>Interpretation:</b> SOC stock represents the total carbon stored in the soil and is one of the clearest indicators of long-term soil functioning. Values are lowest in degraded croplands of semi-arid areas (20–40 t C/ha in the top 30 cm), moderate in Mediterranean systems (30–60 t C/ha), and much higher in temperate croplands and grasslands (50–150 t C/ha). By contrast, peatlands and wetlands such as marshes can exceed 300–400 t C/ha, sometimes reaching several hundred tonnes per hectare. The reason is that water saturation creates anaerobic (oxygen-poor) conditions which slow down the decomposition of organic matter. Plant residues accumulate faster than they can break down, forming peat or thick organic layers that act as a long-term carbon sink. From a soil health perspective, low SOC stocks signal soils with reduced resilience and fertility, while high stocks indicate soils with strong buffering capacity, better water regulation and significant climate mitigation potential.',
            color: 'blue'
          },
          {
            title: 'Bulk density (g/cm³):',
            description: 'Mass of oven-dry soil per unit volume. Crucial for converting SOC content into SOC stock and strongly affects aeration, root development and microbial activity.',
            extra: '<b>Method:</b> Drying samples at 105 °C until constant weight to determine dry mass',
            interpretation: '<b>Interpretation:</b> Bulk density reflects compaction and porosity, two properties central to soil health. Sandy soils usually show higher values (1.4–1.7 g/cm³), loams are moderate (1.2–1.5 g/cm³), clays lower (1.0–1.3 g/cm³), and organic soils very low (<0.9 g/cm³). Healthy soils generally balance strength and porosity; bulk density values above 1.6 g/cm³ restrict root growth and water infiltration, leading to stress for plants and microbes. Values below 1.2 g/cm³ are favourable, indicating loose, aerated soils that sustain biological activity and water movement.',
            color: 'amber'
          },
          {
            title: 'SOC/Clay ratio:',
            description: 'The ratio between organic carbon and clay fraction. It reflects structural stability, resilience against degradation and the soil’s long-term capacity to stabilise carbon.',
            extra: '<b>Method:</b> calculated as SOC (%) ÷ clay (%)',
            interpretation: '<b>Interpretation:</b> The SOC/clay ratio is an effective proxy for soil structural stability and long-term carbon protection. Ratios above 0.10 (1:10) signal that enough organic carbon is associated with the clay fraction to stabilise aggregates and resist erosion. Ratios between 0.05 and 0.10 are typical of many mineral soils and suggest moderate resilience. Ratios below 0.05 indicate vulnerable soils, where organic matter is insufficiently protected and easily lost under tillage or drought. Healthy soils tend to maintain higher ratios, ensuring both physical stability and sustained carbon sequestration potential.',
            color: 'purple'
          }
        ],
        additionalText: 'SOC decline below critical thresholds indicates reduced soil fertility and higher degradation risk. Combining SOC content, SOC/clay ratio, and bulk density gives a robust view of soil carbon status. Maintaining adequate SOC supports soil structure, water retention, and nutrient cycling, enhancing climate resilience.'
      },
      'Soil pH Balance': {
        cards: [
          {
            title: 'Soil pH (measured in H₂O or CaCl₂):',
            description: 'This is the ratio between precompression stress (the soil\'s internal resistance) and the actual stress applied by machinery or loads.',
            extra:'<b>Method:</b> Potentiometric measurement with a calibrated glass electrode after preparing a soil–water suspension (commonly 1:2.5 or 1:5 soil:solution ratio).',
            interpretation: '<b>Interpretation:</b> Soil pH is a master variable controlling nutrient availability, microbial activity, and pollutant mobility. Neutral to slightly acidic soils (pH 6.0–7.5) are generally optimal for most crops and microbial processes. Acidic soils (pH < 5.5) often suffer from aluminium and manganese toxicity, reduced nutrient availability, and loss of biological activity. Alkaline soils (pH > 8.0) are prone to micronutrient deficiencies (iron, zinc, manganese) and can indicate sodicity problems. Maintaining pH within the 6–7 range is typically a marker of healthy, resilient soils, while values far outside this range suggest constraints on fertility and potential degradation risks.',
            color: 'green'
          },
        ],
        additionalText: 'The report from the European Environment Agency classifies soil pH as a Key Indicator of soil health. This indicator is used to assess critical functions such as biodiversity support capacity and biomass production potential. The report states that deviations from the optimal range are considered a chemical threat and provides thresholds for monitoring soil quality across Europe.'
      },
      'Soil Pollution': {
        cards: [
          {
            title: 'Concentration of Inorganic Pollutants (Heavy Metals):',
            description: ' Most important indicators of soil contamination and health decline. Elements such as lead, cadmium, arsenic, mercury and chromium often originate from mining, industrial activities, fertilisers, and irrigation with polluted water.',
            extra:'<b>Method:</b> ICP-OES/Dig.Ác.',
            interpretation:'<b>Interpretation:</b> In uncontaminated agricultural soils, typical background values are usually Lead (Pb) < 50 mg/kg, Cadmium (Cd) < 1 mg/kg, Arsenic (As) < 10–20 mg/kg, Mercury (Hg) < 0.1 mg/kg, and Chromium (Cr) < 70–100 mg/kg. Concentrations significantly above these ranges suggest anthropogenic contamination (from industry, mining, fertilisers or pesticides) and represent a potential risk for soil health, crop uptake, and food safety.',
            color: 'green'
          },
          {
            title: 'Concentration of Persistent Organic Pollutants (POPs) (µg/kg)',
            description: 'Direct measurement of the concentration of organic compounds (e.g., pesticides, PCDD/PCDF) in the topsoil against established thresholds.',
            extra:'<b>Method:</b> Gas Chromatography–Mass Spectrometry (GC–MS) or High-Resolution GC/HRMS',
            interpretation: '<b>Interpretation:</b> In healthy, uncontaminated soils, concentrations of POPs such as organochlorine pesticides (e.g. DDT, HCH, aldrin, dieldrin), polychlorinated biphenyls (PCBs), and dioxins/furans (PCDD/PCDF) are generally below detection limits or <10 µg/kg. Levels above regulatory thresholds (e.g. 50–100 µg/kg for DDT, 20–50 µg/kg for PCBs, or a few ng/kg TEQ for dioxins/furans) indicate contamination that may impair soil biodiversity, disrupt microbial processes, and pose risks to human and ecosystem health through bioaccumulation.',
            color: 'blue'
          }
        ],
        additionalText: 'Due to the complexity of soil functions, site conditions, and management practices, there is no EU consensus on unified critical limits for soil pollutants. National standards vary widely. Soil Screening Values (SSVs) must consider factors like soil properties, groundwater depth, and local practices to accurately link pollutant concentration to its eventual impact on endpoints like food quality or human health.'
      },
      'Soil Sealing': {
        cards: [
          {
            title: 'Degree of Imperviousness (DI, %):',
            description: 'Share of sealed/impervious surfaces (buildings, asphalt, concrete) relative to the total land area.',
            extra:'<b>Method:</b> Derived mainly from remote sensing (e.g. Copernicus High-Resolution Layer – Imperviousness, Sentinel-2, Landsat) and validated with aerial imagery. Calculated as sealed pixels ÷ total pixels × 100.<br/><b>Interpretation:</b> The degree of imperviousness shows how much of the land surface is covered by sealed materials such as asphalt, concrete, or buildings. Low percentages, below 1%, indicate largely natural or rural areas where soils remain functional. Moderate levels, around 10–30%, are typical of expanding suburban zones, while higher values above 30% reflect dense urbanisation where soils lose their capacity to infiltrate water, recharge aquifers, and support biological activity.',
            color: 'green'
          },
          {
            title: 'Imperviousness Change (ΔDI):',
            description: 'Rate of increase or decrease in sealed surfaces over a defined period.',
            extra: '<b>Method:</b> Compare DI maps from different years (e.g. 2012–2018–2021). Change = DI₂ – DI₁, expressed in percentage points or hectares/year.<br/><b>Interpretation:</b> The change in imperviousness reveals whether sealing is expanding or retreating. An increase over time signals ongoing soil loss to construction and infrastructure, while stable values mean land use is not shifting further towards sealing. Negative changes are rare but highly significant, as they indicate successful de-sealing or renaturalisation efforts, such as creating green roofs, restoring permeable surfaces, or removing obsolete infrastructure.',
            color: 'blue'
          },
          {
            title: 'National Target: “No Net Land Take”',
            description: 'Policy target aiming at zero net increase in sealed land by a given year (EU vision: 2050)',
            extra:'<b>Method:</b> Balance between newly sealed land and land that has been restored or de-sealed. Calculated as: Net Land Take = (newly sealed area) – (restored area). <br/><b>Interpretation:</b> translates these measurements into a clear policy goal: halting the overall increase in sealed land. When the balance of newly sealed versus restored surfaces is close to zero or even negative, it means that management and planning measures are working. If the balance is positive and growing, it indicates that soil is still being lost despite commitments, highlighting the need for stronger interventions.',
            color: 'amber'
          }
        ],
        additionalText: 'Soil sealing is an irreversible process that results in the permanent loss of soil functions. The primary driver is urban sprawl and development, leading to the replacement of natural soil with impervious surfaces. Sustainable urban planning, green infrastructure, and protection of natural soil areas are essential to mitigate this threat.'
      }
    };
    return recommendations[indicator] || recommendations['Soil Compaction'];
  };

  const content = getIndicatorContent(indicator);
  const detailedRecs = getDetailedRecommendations(indicator);

  const getColorClasses = (color) => {
    const colorMap = {
      green: {
        bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
        border: 'border-green-400',
        text: 'text-green-600',
        dot: 'bg-green-500'
      },
      blue: {
        bg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
        border: 'border-blue-400',
        text: 'text-blue-600',
        dot: 'bg-blue-500'
      },
      amber: {
        bg: 'bg-gradient-to-r from-amber-50 to-orange-50',
        border: 'border-amber-400',
        text: 'text-amber-600',
        dot: 'bg-amber-500'
      },
      purple: {
        bg: 'bg-gradient-to-r from-purple-50 to-violet-50',
        border: 'border-purple-400',
        text: 'text-purple-600',
        dot: 'bg-purple-500'
      }
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <div className="overlay">
      <div
        className={`container ${closing ? 'soilThreatFadeOut' : 'soilThreatFadeIn'}${indicator === 'Soil Pollution' ? ' tallModal' : ''}`}
        style={{ position: 'relative', display: showRecommendations ? 'none' : 'flex' }}>
        <button className="closeBtn" onClick={handleClose} aria-label="Close modal"
          style={{ position: 'absolute', top: 24, right: 32, zIndex: 10 }}>
          ✕
        </button>
        <div className="contentRow">
          <div className="leftCol">
            <div
              className={`imageBox${['Soil Biodiversity', 'Soil Organic Carbon', 'Soil Sealing'].includes(indicator) ? ' imageBox-tall' : ''}${indicator === 'Soil Pollution' ? ' imageBox-pollution' : ''}`}
              style={{ marginBottom: '30px' }}
            >
              <img src={content.image} alt={content.title} />
            </div>
          </div>
          <div className="rightCol">
            <div className="titleWrapper">
              <h3 className="title">{content.title}</h3>
            </div>
            <p className="description" style={{marginBottom: '10px'}} dangerouslySetInnerHTML={{ __html: content.description }}>
            </p>
            <div className="divider"></div>
          </div>
        </div>
        <div className="recommendationBox" style={{width: '100%', marginBottom: '4%', marginTop: '-6%', padding: '18px 32px 0 32px'}}>
          <span className="description justified" dangerouslySetInnerHTML={{ __html: content.recommendation }}></span>
          <button 
            className="recommendationsBtn" 
            onClick={handleShowRecommendations}
            style={{
              display: 'block',
              margin: '20px auto 0 auto',
              background: '#4e7c2b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(78, 124, 43, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#2d5016';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(78, 124, 43, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#4e7c2b';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(78, 124, 43, 0.3)';
            }}
          >
            View Recommendations
          </button>
        </div>
      </div>

      {/* Modal de Recomendaciones */}
      {(showRecommendations || recommendationsClosing) && (
        <div className="recommendationsOverlay">
          <div className={`recommendationsContainer ${recommendationsClosing ? 'recommendationsSlideOut' : 'recommendationsSlideIn'}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0' }}>
            <button 
              className="closeBtn" 
              onClick={handleCloseRecommendations} 
              aria-label="Close recommendations modal"
              style={{ position: 'absolute', top: 24, right: 32, zIndex: 10 }}
            >
              ✕
            </button>
            <div className="flex flex-col items-center justify-start w-full h-full p-4 overflow-y-auto" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#4fc97a #e6f7ee'
            }}>
              <style jsx>{`
                div::-webkit-scrollbar {
                  width: 8px;
                }
                div::-webkit-scrollbar-track {
                  background: #f0fdf4;
                  border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb {
                  background: linear-gradient(180deg, #4fc97a 0%, #2d5016 100%);
                  border-radius: 10px;
                  border: 2px solid #f0fdf4;
                }
                div::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(180deg, #2d5016 0%, #1a3009 100%);
                }
              `}</style>
              <h3 className="mb-6 text-2xl font-extrabold text-center text-green-500 tracking-widest uppercase font-montserrat drop-shadow-sm">
                WHAT NOVASOIL RECOMMENDS...
              </h3>
              
              <div className="w-full max-w-2xl space-y-3">
                {detailedRecs.cards.map((card, index) => {
                  const colors = getColorClasses(card.color);
                  return (
                    <div key={index} className={`${colors.bg} border-l-4 ${colors.border} rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300`}>
                      <h4 className={`text-lg font-bold ${colors.text} mb-3 flex items-center`}>
                        <span className={`w-3 h-3 ${colors.dot} rounded-full mr-3`}></span>
                        {card.title}
                      </h4>
                      <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: card.description }} />
                      {card.extra && (
                        <p className="text-gray-700 leading-relaxed mt-5" style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: card.extra }} />
                      )}
                      {card.interpretation && (
                        <p className="text-gray-700 leading-relaxed mt-3" style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: card.interpretation }} />
                      )}
                    </div>
                  );
                })}

                {/* Additional Recommendations Card */}
                <div className="bg-gradient-to-r from-emerald-100 to-green-100 border-2 border-emerald-300 rounded-xl p-8 shadow-lg mt-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-emerald-500 rounded-full p-2 mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-emerald-700">Additional Recommendations</h4>
                  </div>
                  <p className="text-emerald-800 leading-relaxed text-lg" style={{ textAlign: 'justify' }}>
                    {detailedRecs.additionalText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoSoilThreat;
