var config = {
    style: 'mapbox://styles/a-c-h/cm9vbh9vt005801si2d6kearf',
    // leave commented to use Mapbox Standard Style
    accessToken: 'pk.eyJ1IjoiYS1jLWgiLCJhIjoiY204cGd2OHI1MDI0azJsc2g0dXllbjBudSJ9.BYcZYmnXeLTO9-QX1vDaCQ',
    showMarkers: false,
    markerColor: '#3FB1CE',
    //projection: 'equirectangular',
    //Read more about available projections here
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: false,
    insetOptions: {
        markerColor: 'orange'
    },
    insetPosition: 'bottom-right',
    theme: 'light',
    use3dTerrain: true, //set true for enabling 3D maps.
    auto: false,
    title: 'Biodiversity and Ecosystem Function in FMNR Practice',
    subtitle: 'Exploring biodiversity and ecosystem function in FMNR practice',
    byline: 'Story by CIFOR-ICRAF SPACIAL Lab',
    footer: `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; width: 100%;">
        <div style="flex: 1 1 60%; text-align: left; font-size: 13px;">
            <p><strong>References:</strong></p>
            <p>[1] Maestre, F. T., Eldridge, D. J., Soliveres, S., & Bowker, M. A. (2012). Structure and functioning of dryland ecosystems in a changing world. In <i>Dryland Ecohydrology</i> (pp. 1–20). Springer, Berlin, Heidelberg.</p>
            <p>[2] Kone, B., & Diallo, A. (2015). Biodiversity and ecosystem services in the Inner Niger Delta of Mali: A review. <i>African Journal of Ecology</i>, 53(1), 1–11.</p>
            <p>[3] Lohbeck, M., Albers, P., Boels, L.E. et al. (2020) Drivers of farmer-managed natural regeneration in the Sahel. Lessons for restoration. <i>Nature</i> Sci Rep 10, 15038.</p>
            <p>[4] Kone, B., & Diallo, A. (2015). Biodiversity and ecosystem services in the Inner Niger Delta of Mali: A review. <i>African Journal of Ecology</i>, 53(1), 1–11.</p>
            <p>[6] Spohn, M., Et al. (2023). The Positive Effect of Plant Diversity on Soil Carbon Depends on Climate. <i>Nature Communications</i>, 14(1), 6624.</p>
        </div>
        <div style="flex: 1 1 30%; text-align: right; display: flex; flex-direction: column; align-items: flex-end;">
            <img src="assets/spacial_logo.png" alt="Logo 1" style="height: 120px; width: 260px; margin-bottom: 10px;">
            <img src="assets/icraf_logo.png" alt="Logo 2" style="height: 120px; width: 260px;">
        </div>
    </div>
    `,

    chapters: [                 
        {
            id: 's1',
            alignment: 'left',
            hidden: false,
            title: 'Farmer Managed Natural Regeneration and Biodiversity',
            image: 'assets/fmnr_img1.jpg',
            description: '<p> <b>Biodiversity</b>, the diversity of life - genes, species and ecosystems - is increasingly recognised in restoration practices as <b>critical to regaining and sustaining ecosystem function.</b></p>' +
            '<p> When considering restoration programs, you might think of traditional tree-planting campaigns, where actors typically introduce tree stock to the landscape from an external source. In dryland contexts however, this approach poses challenges, due to limited rainfall and soil organic carbon to support the establishment of juvenile trees. Landscape restoration in such contexts then requires practices that rely on the latent regenerative capacity already present in the landscape - existing root systems, soil seed banks, shrubs and remnant trees.</p>' +
            '<p> <b>Farmer Managed Natural Regeneration (FMNR)</b> is one such practice, and typically involves supporting the <b>regeneration of natural vegetation through weeding, pruning, coppicing, seeding, or fencing</b> rather than transplanting tree stock to the landscape.</p>'+
            '<p> Thus the restoration trajectory comes down to <b>the way that natural assets in the landscape are managed</b> and biodiversity often leads to greater diversity of benefits, like soil formation, water regulation, carbon cycling, climate buffering, livelihood benefits like timber, fodder, and medicinals.</p>',
            location: {
                center: [20, 20], //Ghana tree point from fmnr 
                zoom: 3.5,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [{ action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' }],
            onChapterExit: [
                { action: 'visibility', layer: 'adm0-clean', visibility: 'visible' },
                { action: 'visibility', layer: 'adm1-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' }
            ]
        },
        {
            id: 's2',
            alignment: 'left',
            hidden: false,
            title: 'FMNR in Regreening Africa',
            image: '',
            description: '<p> This article provides a case study from the Regreening Africa program, implemented between 2017 and 2021. Restoration activities under the program took place across eight countries in sub Saharan Africa, employing a combination of tree planting, tree nursery establishment, and FMNR practices. </p>' +
            '<p> The headline goal for Regreening Africa was to restore 5 million hectares of degraded land, sequester 20 million tons of carbon, and improve the livelihoods of 10 million people. </p>' +   
            '<iframe width="560" height="315" src="https://www.youtube.com/embed/1XUyv1PKibg?si=4UlYJ5VjK-p0UVi0"'+
            'title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'+
            '<p> While tree planting focuses on the establishment of seedlings, FMNR aims to encourage apical dominance (i.e., upward growth) of woody species in the landscape through a range of management techniques like pruning, coppicing, weeding, and fencing. By encouraging upward growth, woody species grow taller, quicker, yielding benefits like shade, fodder, timber and fruit. Typically requiring lower resource inputs and achieving higher survival rates under dryland conditions, <b>FMNR presents a cost-effective method to recovering biodiversity and ecosystem function in the landscape.</b> </p>'+
            '<p> This article focuses specifically on Regreening Africas FMNR sites, that have been aggregated into administrative units (ADM0, ADM1, and ADM2), <b>exploring biodiversity patterns at different spatial scales and links to ecosystem function</b>. Data was retrieved from the <a href="https://play.google.com/store/apps/details?id=com.icraf.gsl.regreeningafrica&hl=en-US" target="_blank">Regreening App</a>, deployed in the Regreening Africa program. </p>',
            location: {
                center: [20, 20], //Ghana tree point from fmnr 
                zoom: 5,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'adm0-clean', visibility: 'visible' },
                { action: 'visibility', layer: 'adm1-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
                { layer: 'adm0-clean', opacity: 0.5 }
            ],
            onChapterExit: [
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
            ]
        },
        {
            id: 's3',
            alignment: 'center',
            hidden: false,
            title: 'Biodiversity in dryland systems',
            image: '',
            description: `
            <div style="line-height: 1.5; font-size: 18px; font-family: 'Lato', sans-serif;">
                <p> Drylands span nearly 40% of the Earth’s land surface and support over a third of the global population. Though shaped by aridity, low soil fertility, and extreme temperature fluctuations, these landscapes sustain a rich biodiversity, including high levels of endemism. It is precisely these environmental pressures that have driven the evolution of uniquely adapted plant communities with traits like deep rooting, reduced leaf area, complex microbial associations, and drought-induced dormancy that allow species to persist through prolonged dry periods and exploit short-lived wet periods.</p>
                <p> This ecological filtering results in high functional diversity, which underpins key ecosystem processes like soil stabilisation, enhanced water infiltration, and nutrient cycling under limiting conditions. This ecological specialisation is especially evident in regions like the Sahel and the Horn of Africa, where drought-tolerant flora play vital roles in sustaining both ecosystem processes and local livelihoods. </p>
        
                <img src="assets/biodiv_graphic.png" 
                    style="width: 65%; max-width: 750px; display: block; margin: 0 auto 20px auto; box-shadow: none;">

                <p><b>Biodiversity supports essential services:</b></p>
                <ul style="padding-left: 20px; margin: 0;">
                    <li> Erosion control through diversified root structures and ground cover</li>
                    <li> Enhanced soil organic carbon accumulation via increased biomass and microbial activity</li>
                    <li> Improved water infiltration and groundwater recharge through improved soil structure and perennial vegetation</li>
                    <li> Provision of fodder, fuelwood, and non-timber products, vital for rural livelihoods</li>
                    <li> Preservation of culturally important species and traditional ecological knowledge systems</li>
                </ul>
            </div>
        `,

            location: {
                center: [-0.933198333, 34.33127],
                zoom: 8.5,
                pitch: 60,
                bearing: 0,
                speed: 2, 
                curve: 1, 
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm1-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
            ],
            onChapterExit: []
        },
        {
            id: 's4.1',
            alignment: 'center',
            hidden: false,
            title: 'How do we measure biodiversity?',
            image: 'assets/biodiv_measure_img.jpg',
            description: '<p> So, what does it mean to <i>measure</i> biodiversity? In its broadest sense, measuring biodiversity means quantifying the variety of life in a given system. This typically refers to on-ground surveys to count the number of species present (species richness), their relative abundance, or the diversity of functional traits that contribute to ecosystem processes.</p>'+
            '<p> An essential consideration in any biodiversity assessment is therefore scale: over what spatial and temporal scale are we capturing diversity, and what does that mean for how we interpret ecological patterns?</p>' +
            
            '<p> <b>To help make sense of this, we refer to three levels of diversity:</b></p>' +
            '<p>• <b> Alpha diversity (α-diversity)</b>: the diversity within a particular site or spatial unit - essentially, how many different species are observed in a defined area. </p>'+
            '<p>• <b> Beta diversity (β-diversity)</b>: the difference in species composition between sites - or how distinct communities are from one another across space.</p>'+
            '<p>• <b> Gamma diversity (γ-diversity)</b>:  the total diversity across a broader region or landscape, integrating the variation found across multiple sites.</p>'+
            '<p> Each of these levels offers different insights into ecological structure and function. Depending on the question at hand and the type of data available - be it presence-absence data, abundance counts, or functional trait information - different analytical methods may be used to quantify these aspects of biodiversity. Let’s now take a look at how these concepts play out in our analysis of biodiversity within Regreening Africa’s FMNR landscapes.</p>',
            location: {
                center: [-0.933198333, 34.33127],
                zoom: 8.5,
                pitch: 70,
                bearing: 0,
                speed: 2, 
                curve: 1, 
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                // { layer: 'adm0-layer', opacity: 0 },
                // { layer: 'adm1-layer', opacity: 0 },
                // { layer: 'adm2-threat-layer', opacity: 0 }
            ],
            onChapterExit: []
        },
        {
            id: 'hero-alpha',
            alignment: 'center',
            hidden: false,
            staticBackground: true,
            backgroundColor: '#004d40',
            title: '',
            description: `
                <div class="hero-text-overlay">
                <h1 class="hero-title">Site-level diversity</h1>
                <h2 class="hero-subtitle">Alpha diversity (α-diversity)</h2>
                </div>
            `,
            image: '', 
            location: null,                 
            mapAnimation: '',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },     
        {
            id: 's4',
            alignment: 'center',
            hidden: false,
            title: 'Sites with high local biodiversity (α-diversity)', // fix labels 
            image: '',
            description: `
                <div style="background-color: white; padding: 10px; margin-bottom: 20px;">
                    <img src="assets/adm1_shannon_bar6.png" alt="Descriptive Alt Text"
                    style="width: 100%; max-width: 1000px; display: block; margin: 0 auto 20px auto;">
                </div>
                <p> Analysis of FMNR sites across seven countries in the Regreening Africa program shows an incredible diversity of species <b>(> 1000 species)</b>.</p>
                <p> Diverse plant assemblages often mean a diversity of functional traits such as varying rooting depths, leaf structures, or phenologies that together support efficient resource use, soil stability, and resilience against climatic stressors. In dryland systems, which experience high disturbance and climate variability, such diversity acts as a natural buffer, enhancing ecosystem function and adaptive capacity.</p>
                <p> Site-level diversity
                <span class="tooltip">(α-diversity)
                    <span class="tooltiptext"> Our analysis involved computing three different diversity indices: (i) Richness - the count of unique species present in a community, without considering their relative abundances; (ii) Shannon diversity - quantifies both species richness and evenness by measuring the uncertainty in knowing the species identity of a randomly chosen individual; (iii) Simpson diversity - reflects the probability that two individuals randomly selected from a community belong to different species, giving greater weight to dominant species.
                    </span>
                    </span> can also serve as a practical indicator of land condition and recovery potential. Sites with low species richness and a high presence of invasive or exotic species for example, may reflect deeper degradation while those with diverse, predominantly native assemblages often signal healthier or recovering ecosystems. <b>This makes local biodiversity an important lens for potentially identifying where restoration is succeeding or where more targeted intervention may be needed.</b></p>
                <p> Several regions emerged as diversity hotspots, including <b>Segou in Mali, Tillabery in Niger,</b> and <b>Migori in Kenya</b>. In Ethiopia, both Amhara and Sidama regions show high levels of site-level diversity, though with greater uncertainty (highlighted by wider confidence intervals in the data), which may reflect variation in sampling or local ecological conditions.</p>
            `,
            location: {
                center: [-0.933198333, 34.33127],
                zoom: 8.5,
                pitch: 70,
                bearing: 10,
                speed: 1,
                curve: 1, 
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                // { layer: 'adm0-layer', opacity: 0 },
                // { layer: 'adm1-layer', opacity: 0 },
                // { layer: 'adm2-threat-layer', opacity: 0 }
            ],
            onChapterExit: []
        },
        {
            id: 's5.1',
            alignment: 'left',
            hidden: false,
            title: 'Segou Region - Mali',
            image: 'assets/mali_tominian_img1.jpeg',
            description: '<p> Segou, in south western Mali, lies on the southern edge of the Inner Niger Delta, between the Sahel and Sudanian ecozones. The region is known as a biodiversity hotspot given its proximity to the Ramsar protected Inner Niger Delta, its importance as a breeding ground for migratory birds and diversity of plant life, adapted to a unique climatic transition zone.</p>'+
            '<p> From our data, Segou had an <b>estimated ~ 90 distinct species recorded</b>. While not the region with the highest raw species count overall (Tillabery in Niger had around ~ 150!), Segou ranked highest in <i>Shannon diversity</i> (H′ = 28), indicating not only a high number of species but also a more even distribution in community structure.</p>',
            location: {
                center: [-6.983058333, 13.26481167],
                zoom: 7,
                pitch: 8.01,
                bearing: 0.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'visible' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
                { layer: 'hex-density-adm1', opacity: 0.6 },
                { action: 'filter', layer: 'hex-density-adm1', filter: ['all', ['==', ['get', 'adm1_name'], 'Ségou']] }
              ],
            onChapterExit: [
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' }
            ]                                        
        },
        {
            id: 's5.1.1',
            alignment: 'left',
            hidden: false,
            title: '',
            image: '',
            description: 
            '<p> This biodiversity is increasingly under threat. Agricultural expansion, overgrazing, and deforestation for fuelwood are driving vegetation loss, particularly in flood-prone zones. The resulting degradation intensifies erosion, accelerates runoff, and reduces soil moisture retention, undermining both ecosystem stability and agricultural productivity.</p>'+
            '<p> FMNR offers a low-cost, effective solution by restoring native tree cover and boosting local biodiversity, improving soil structure, water retention, and overall land health. By enhancing ecological function, FMNR strengthens climate resilience and supports the livelihoods of communities reliant on the land. </p>'+
            '<p> Our analysis shows the most abundant FMNR species in this region is <b>Piliostigma reticulatum</b> (n = 2396).</p>',
            location: {
                center: [-6.983058333, 13.26481167],
                zoom: 8.5,
                pitch: 80,
                bearing: 0,
                speed: 1, 
                curve: 2, 
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'visible' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
                { layer: 'hex-density-adm1', opacity: 0.5 },
                { action: 'filter', layer: 'hex-density-adm1', filter: ['all', ['==', ['get', 'adm1_name'], 'Ségou']] }
              ],
            onChapterExit: [
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' }
            ]                                        
        },
        {
            id: 's5.2',
            alignment: 'left',
            hidden: false,
            title: 'Tillabery Region - Niger',
            image: 'assets/niger_ouallam_img1.jpg',
            description: '<p> Tillabery, in the south western corner of Niger, had the highest species richness score (~ 150 species total) and, when weighting for relative abundance of species, the second highest Shannon diversity score (H\'= 24), reflecting both high biodiversity and relatively balanced species composition.</p>'+
            '<p> The region lies within a semi-arid savanna–shrubland mosaic along a tributary of the Niger River, an ecologically important corridor facing increasing pressure from agricultural expansion, fuelwood harvesting, and overgrazing.</p>' +
            '<p> By facilitating the recovery of species like <b>Ozoroa homblei</b> (n = 19,114), a drought-tolerant native that stabilises soils and provides shade and habitat, FMNR helps buffer land degradation, improve ecosystem productivity, and build resilience in one of Niger’s most vulnerable yet biodiverse landscapes.</p>' ,
            location: {
                center: [1.236058333, 14.129205],
                zoom: 7,
                pitch: 70,
                bearing: 0.00,
                speed: 1,
                curve:2,
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'visible' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
                { layer: 'hex-density-adm1', opacity: 0.6 },
                {
                  action: 'filter',
                  layer: 'hex-density-adm1',
                  filter: [ 'all',['==', ['get', 'adm1_name'], 'Tillabéry']]}
                ],
              onChapterExit: [
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' }
              ]
        },
        {
            id: 'hero-species-selection',
            alignment: 'center',
            hidden: false,
            staticBackground: true,
            backgroundColor: '#004d40',
            title: '',
            description: `
              <div class="hero-content" style="padding: 6vh 5vw; display: flex; flex-direction: column; align-items: center; justify-content: start; gap: 1.8em;">
          
                <h1 style="font-size: 3.5em; font-weight: 500; color: #FEFEFA; text-align: center;">Species selection in FMNR</h1>
          
                <p style="font-size: 1.05em; line-height: 1.6; color: #FEFEFA; text-align: justify; max-width: 1000px;">
                  Species selection in FMNR is often determined by the landholder's land-use objectives and other local preferences based on perceived benefit, with multifunctional trees often taking priority [3]. Traditional Ecological Knowledge (TEK) fundamentally shapes species selection and regeneration outcomes in FMNR, guiding decisions based on deep, place-based understandings of species’ multiple uses and role in local ecologies. These embedded knowledge systems influence which species are retained, protected, or removed, ultimately driving biodiversity patterns across the landscape.
                </p>
          
                <p style="font-size: 1.05em; line-height: 1.6; color: #FEFEFA; text-align: justify; max-width: 1000px;">
                  This knowledge is documented through 
                  <a href="https://forestsnews.cifor.org/91920/afrogrow-a-project-to-revolutionize-agroforestry-in-africa" target="_blank">participatory action research programs</a>, and developed into decision-support tools facilitating cross-site learning, allowing communities and practitioners to share context-specific insights and scale up effective FMNR practices.
                </p>
                <hr style="width: 80%; max-width: 600px; border: 0;color: #FEFEFA; border-top: 1px solid #aaa; margin: 1em 0;" />

                <img src="assets/africa_tf_app.png" alt="Africa TreeFinder App"
                     style="width: 100%; max-width: 1000px; height: auto; border-radius: 6px; display: block; box-shadow: 0 2px 6px rgba(0,0,0,0.1);" />

                <blockquote style="font-style: bold; background-color: rgba(255, 255, 255, 0.18); font-size: 1em; color:  #FEFEFA; margin-top: 0.5em 0; padding: 1.2em 1.5em; max-width: 900px; text-align: justify;">
                The Africa TreeFinder App is available for use within within Burundi, Ethiopia, Kenya, Malawi, Rwanda, Tanzania, Uganda and Zambia.
                </blockquote>
                <hr style="width: 80%; max-width: 600px; border: 0; color: #FEFEFA; border-top: 1px solid #aaa; margin: 1em 0;" />
          
                <p style="font-size: 1.05em; line-height: 1.6; color: #FEFEFA; text-align: justify; max-width: 1000px;">
                  Tools like the 
                  <a href="https://play.google.com/store/apps/details?id=com.icraf.gsl.africatreefinder&hl=en-US" target="_blank">Africa TreeFinder App</a>, developed by the ICRAF SPACIAL Lab, allow users to find suitable tree species based on location, land use objectives, and other local preferences. Other resources include the 
                  <a href="https://apps.worldagroforestry.org/treedb/" target="_blank">Agroforestree Database</a>, a global database that documents ecological requirements and potential uses of common species used in agroforestry, helping landholders make informed decisions about which species to plant or protect in their FMNR practices.
                </p>
          
                <div style="position: relative; width: 100%; max-width: 1000px; padding-bottom: 50.625%; height: 0; overflow: hidden;">
                  <iframe style="position: absolute; border-radius: 6px; top: 0; left: 0; width: 100%; height: 100%;" 
                    src="https://www.youtube.com/embed/MX_Akw2ccko?si=xctTXtgwUh8svFWm"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                <hr style="width: 80%; max-width: 600px; border: 0; color:  #FEFEFA; border-top: 1px solid #aaa; margin: 1em 0;" />

                </div>
          
              </div>
            `,
            image: '',
            location: null,
            mapAnimation: '',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
          },                    
        {
            id: 's5.3',
            alignment: 'left',
            hidden: false,
            title: 'Migori County - Kenya',
            image: 'assets/ethio_amhara_img1.jpeg', // hex chloro map of point data
            description: '<p> Migori County lies in the south west of Kenya, flanked to the left by Lake Victoria, and to the right by the Eastern Afromontane global biodiversity hotspot. A highly biodiverse region with wooded grasslands, riparian strips, and agroecosystems with small patches of scrubland and secondary forest, Migori had a <b>unique species count of 44 species.</b></p>'+
            '<p> Since 1980, Migori County has seen some of the fastest rates of land conversion in the country [5]. A surge in population growth has led to increasing land pressure from fuel wood collection, agricultural expansion, charcoal production, and urban development. A significant decline in the diversity of the region\'s natural ecosystems and ecosystem services has ensued, while local communities overwhelmingly rely on the sustained productivity of these systems and services.</p>' +
            '<p> Despite these ongoing disturbances, Migori had one of the highest Shannon diversity scores (H\' = 21) of all FMNR sites, demonstrating significant potential in the regenerative capacity of the land under effective restoration practices. </p>',
            location: {
                center: [34.33127, -0.933198333],
                zoom: 7,
                pitch: 8.01,
                bearing: 0.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: 'addHexTooltipListener',
            onChapterEnter: [
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'visible' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
                { layer: 'hex-density-adm1', opacity: 0.6 },
                {
                  action: 'filter',
                  layer: 'hex-density-adm1',
                  filter: [
                    'all',
                    ['==', ['get', 'adm1_name'], 'Migori'],
                  ]
                }
              ],
              onChapterExit: [
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' }
              ]
        },
        {
            id: 's5.3.1',
            alignment: 'right',
            hidden: false,
            title: 'Land Use Land Cover (LULC) decadal net changes in Migori watershed 1980 - 2020', // blow this up
            image: '',
            description: `
            <div>
            <p> Despite significant land use and and cover changes in Migori and other Kenyan counties along the Lake Victoria Basin, the region has been able to maintain a relatively high level of floristic diversity. </p>
            <p> <b> A complex combination of factors likely underlies this pattern:</b>
            <p> • <b> High baseline biodiveristy levels</b> - Migori County lies on the south-eastern shoreline of Lake Victoria, the lower Kuja River basin, and the eastern edges of the Mara-Serengeti ecosystem. Biodiversity in this region reflects a transitional zone between lake-margin wetlands, riverine systems, agricultural landscapes, and dryland savannahs, supporting important wetland, aquatic, and savannah-edge species. It is ecologically significant as a connective zone between the lake ecosystem and the Mara-Serengeti ecological corridor. </p>
            <p> • <b> Vegetation fragmentation creates edge effects</b> - Land conversion into smaller patches can create edge effects, which can increase biodiversity by providing a variety of microhabitats and niches for different species. </p>
            <p> • <b> Cultural practices</b> - The Luo people, who inhabit the region, have a long history of sustainable land use practices that promote biodiversity conservation. These practices include traditional agroforestry systems, which integrate trees and shrubs into traditional agroecosystems, and the use of indigenous knowledge to manage natural resources sustainably.</p>
            <p> The area features species common to savannah-woodland mosaics, dominated by Acacias, Combretums, and Ficus'. The most abundant species found in this region was <b>Afrocarpus gracilior</b> (n = 663), or African Fern Pine. </p>
            </div>
        `,
            location: {
                center: [34.73127, -0.933198333],
                zoom: 9,
                pitch: 8.01,
                bearing: 0.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'visible' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { layer: 'hex-density-adm1', opacity: 0.5 },
                {
                  action: 'filter',
                  layer: 'hex-density-adm1',
                  filter: [
                    'all',
                    ['==', ['get', 'adm1_name'], 'Migori']
                  ]
                }
              ],
              onChapterExit: [
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' }
              ]
        },  
        {
            id: 'hero-iucn',
            alignment: 'center',
            hidden: false,
            staticBackground: true,
            backgroundColor: '#004d40',
            title: '',
            description: `
                <div class="hero-text-overlay">
                <h1 class="hero-title">Rare and threatened species</h1>
                <h2 class="hero-subtitle">(IUCN Red List)</h2>
                </div>
            `,
            image: '', 
            location: null,                 
            mapAnimation: '',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },               
        {
            id: 's6',
            alignment: 'fully',
            hidden: false,
            title: 'Rare and threatened plant species', // fix labels and use more intuitive colouring (CR = red etc)
            image: '',
            description: `
            <div style="background-color: white; padding: 10px; margin-bottom: 20px;">
                <img src="assets/iucn_cat_per_country_stacked1.png" alt="Descriptive Alt Text">
            </div>
            <p> Beyond broad measures of species richness and functional diversity, it is critical to consider <b>which</b> species are present. Some sites contain species of particular conservation concern - those listed on the IUCN Red List due to their vulnerability to disturbance, restricted ranges, or specific ecological requirements.</p>
            <p> These regions are especially significant as they are often under-sampled and under-reported, they may harbour unique or threatened species whose extinction risk is heightened by accelerating landscape change. Such areas represent invaluable conservation opportunities embedded within living, productive landscapes. </p>
            <p> Here, <b>FMNR plays a dual role of restoring ecosystem services, but also protecting biodiversity through the recovery of species at risk of disappearing.</b></p>
            `,
            location: {
                center: [20, 20],
                zoom: 4,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm1-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
            ],
            onChapterExit: []
        },
        {
            id: 's6.1',
            alignment: 'left',
            hidden: false,
            title: 'Threatened species in Ghana', // smth acknowledging exotics with VU status, and also, how the IUCN's last assessment of v paradoxa was more than 25 years ago. 
            image: 'assets/ghana_iucn_img.jpg',
            description: '<p>Ghana had the highest number of threatened species, with <b>approximately 27% of all species</b> listed as Vulnerable, Endangered or Critically Endangered under the <a href="https://www.iucnredlist.org/en" target="_blank">IUCN Red list</a>.</p>'+
            '<p> The most common species of concern found in our data for Ghana were <i>Vitellaria paradoxa</i> (VU), commonly known as Shea tree, and <i> Tectona grandis</i> (EN), commonly known as Teak tree. </p>'+
            '<p> Vitellaria paradoxa was last assessed by the IUCN in 1998 and is earmarked as needing an update, despite growing global demand for shea in the cosmetics and food industries. In Ghana, this demand has led to increased pressure on natural shea stands through unsustainable harvesting, even as the sector provides vital income, particularly for women. At the same time, there’s growing interest in shea planting and parkland restoration, creating a complex dynamic where overexploitation and plantation efforts are unfolding in parallel, highlighting the need for updated data and clearer guidance on sustainable management.</p>'+
            '<p> The presence of economically valuable but endangered species such as Tectona grandis, a non-native widely planted for timber, highlights the trade-offs in managing multifunctional agroforestry landscapes. While such exotics can provide economic returns and reduce pressure on native forests, they may compete with indigenous plant species or alter local ecosystem processes. </p>',
            location: {
                center: [-2.55465451, 9.42052605],
                zoom: 6,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'visible' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
                { action: 'filter', layer: 'adm2-iucn-clean', filter: ['all', 
                    ['==', ['get', 'COUNTRY'], 'Ghana'],
                    ['>', ['get', 'threat_prop'], 0]
                ]}
              ],              
            onChapterExit: [
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' }
            ]            
        }, //insert next chap here on pa
        {
            id: 's6.1.1',
            alignment: 'left',
            hidden: false,
            title: '',  
            image: '',
            description: '<p> Strikingly, <b>nearly half (n = 508) of all FMNR-associated species in our dataset are absent from the IUCN Red List database altogether</b>. This highlights a significant knowledge gap in global species assessments, particularly for dryland woody flora and agroforestry species that are ecologically and culturally important but often overlooked in conservation prioritisation. <b>The absence of formal threat assessments limits our ability to understand extinction risks, monitor population trends, or guide sustainable management.</b></p>'+
            '<p> Yet, our findings also reinforce that biodiversity conservation is not confined to designated protected areas. <b>Productive, community-managed landscapes like FMNR sites can support rich and sometimes at-risk biodiversity.</b> Recognising where threatened or data-deficient species occur within these working landscapes is critical to aligning restoration goals with conservation outcomes. </p>',
            location: {
                center: [-2.55465451, 9.42052605],
                zoom: 6,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'visible' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
                { action: 'filter', layer: 'adm2-iucn-clean', filter: ['all', 
                    ['==', ['get', 'COUNTRY'], 'Ghana'],
                    ['>', ['get', 'threat_prop'], 0]
                ]}
              ],              
            onChapterExit: [
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' }
            ]            
        }, 
        {
            id: 's6.2',
            alignment: 'left',
            hidden: false,
            title: 'Protected areas and ecological connectivity',  
            image: '',
            description: '<p> Overlaying species occurrence data with the World Database on Protected Areas (WDPA) reveals that <b>many threatened and data-deficient species occur outside of formally protected areas.</b> In regions like northern Ghana, where protected area coverage is sparse and land is largely under customary tenure, community-managed landscapes like FMNR sites are important refugia for dryland woody flora. </p>'+
            '<p> <b>These working landscapes play a critical role in maintaining landscape connectivity, enabling gene flow, dispersal and range shifts across fragmented environments.</b></p>'+
            '<p> Regenerating woody cover through FMNR helps retain vegetation structure and continuity across the landscape, supporting ecological processes beyond protected area boundaries. While formal reserves remain important, much of the region’s biodiversity depends on what happens in the surrounding landscape, particularly in areas under community management.</p>',
            location: {
                center: [-2.55465451, 9.42052605],
                zoom: 6,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'visible' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'visible' },
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' },
                { layer: 'adm0-clean', opacity: 0.5 },
              ],              
            onChapterExit: [
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' }
            ]            
        },
        {
            id: 's6.2.1',
            alignment: 'left',
            hidden: false,
            title: '', 
            image: '',
            description: '<p> Incorporating species distribution data into restoration planning improves the potential to align ecosystem recovery with conservation priorities.</p>'+
            '<p> Existing data sources such as the <a href="https://forestsnews.cifor.org/84208/want-to-know-where-most-trees-grow-ask-treegoer?fnl=en" target="_blank">TreeGOER</a> database which provides observed environmental ranges for most known tree species and <a href="https://bii4africa.org" target="_blank">bii4africa</a> an intactness index for African flora and fauna, can provide useful benchmarks on the integrity and range of plant communities across landscapes, reinforcing the need for spatially informed, landscape-scale approaches to restoration.</p>'+
            '<p> <b>Understanding the distributions of rare and threatened plant species and the range dynamics that shape them is critical for informing where restoration is most needed and how it should be designed.</b> In landscapes like those of northern Ghana, where formal protection is limited, this lens helps ensure that restoration supports both conservation priorities and the long-term needs of the communities who manage these lands.</p>',
            location: {
                center: [-2.55465451, 9.42052605],
                zoom: 6,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'visible' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'visible' },
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' },
                { layer: 'adm0-clean', opacity: 0.5 },
              ],              
            onChapterExit: [
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' }
            ]            
        },
        {
            id: 'hero-beta',
            alignment: 'center',
            hidden: false,
            staticBackground: true,
            backgroundColor: '#9D825D',
            title: '',
            description: `
            <div class="hero-height-big"
                style="min-height: 100vh; padding: 4vh 5vw; display: flex; flex-direction: column; align-items: center; box-sizing: border-box;">

                <!-- Image pinned to top -->
                <img src="assets/a.indica_img.png" 
                    alt=""
                    class="no-shadow"
                    style="width: 100%; max-width: 550px; height: auto; border-radius: 6px; display: block; margin-bottom: 2em;" />

                <!-- Centered text block -->
                <div style="flex: 1; width: 100%; display: flex; justify-content: center;">
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.8em; max-width: 1400px;">

                    <h2 style="font-size: 2em; font-weight: 700; color: #FEFEFA; text-align: center;">
                    Managing Trade-offs: Invasives in FMNR and dryland restoration
                    </h2>

                    <p style="font-size: 1.05em; line-height: 1.6; color: #FEFEFA; text-align: justify;">
                    Invasive species are a frequently overlooked driver – and indicator – of land degradation. While frequently introduced for perceived benefits like shade, fast growth, fodder, or fuel, many species can escape cultivation and outcompete native flora, altering local ecologies and reducing biodiversity. <b>In dryland systems, invasives can exacerbate water scarcity, suppress
                    regeneration of indigenous species, and shift soil properties in ways that hinder ecosystem recovery.</b> Our FMNR dataset found several species flagged as invasives across several countries, such as <i>Grevillea robusta, Azadirachta indica, Senna spectabilis,</i> and <i>Mimosa pigra</i>. Despite this, data on their spread and impact in these regions remains sparse, limiting our
                    understanding of their long-term ecological consequences.
                    </p>

                    <p style="font-size: 1.05em; line-height: 1.6; color: #FEFEFA; text-align: justify;">
                    This creates a tension in FMNR because FMNR relies on regeneration from existing seedbanks and rootstocks, it can inadvertently promote invasive or disturbance-adapted species, especially in degraded landscapes where native seed sources are scarce. <b>While some invasives offer
                    short-term gains, their long-term ecological costs can drive further degradation. Strengthening monitoring of regrowth, supporting farmers with species identification, prioritising pruning native stems, investing in improved native germplasm, and coordinating landscape-level control efforts can help ensure
                    regeneration strengthens, rather than undermines, ecosystem resilience.</b>
                    </p>

                </div>
                </div>
            </div>
            `,

            image: 'assets/fmnr_img1.jpg',  
            location: null,                     
            mapAnimation: '',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        }, 
        {
            id: 'hero-zeta',
            alignment: 'center',
            hidden: false,
            staticBackground: true,
            backgroundColor: '#004d40',
            title: '',
            description: `
                <div class="hero-text-overlay">
                <h1 class="hero-title">Comparing biodiversity across sites</h1>
                <h2 class="hero-subtitle">Spatial turnover (β-diversity)</h2>
                </div>
            `,
            image: '',  
            location: null,            
            mapAnimation: '',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        }, 
        {
            id: 's7',
            alignment: 'fully',
            hidden: false,
            title: 'Spatial Turnover in Dryland Biodiversity (β-diversity)', // separate out east africa and west africa 
            image: '',
            description: `
            <div style="background-color: white; padding: 10px; margin-bottom: 20px;">
            <img src="assets/nmds_jacc_adm1.png" alt="Descriptive Alt Text" style="margin-bottom: 20px;">
            </div>
            <p> At the landscape scale, we are interested not only in how many species their are, but <b>how species composition changes from one site to another</b>. This spatial variation, known as beta diversity, reflects how species change across environmental gradients shaped by factors like soil type, land-use history, disturbance regimes, and climate. </p>
            <p> High beta diversity 
                <span class="tooltip">(β-diversity)
                    <span class="tooltiptext"> There are many different ways to capture species dissimilarity between sites. In this analysis, we use two approaches. Presence-only (Jaccard diversity) and abundance-weighted (Bray-Curtis diversity). For our presence-only data, we used a Non-metric Multidimensional Scaling (NMDS) method. NMDS condenses high-dimensional species data into two or three dimensions, based on a dissimilarity matrix. 
                    
                    The method preserves the ranked differences in species composition, so that <b>points plotted closer together represent sites with more similar communities.</b> There’s no fixed meaning to the axes, but they reveal gradients of similarity and difference that can often be linked to environmental conditions or management history. For our abundance-weighted data, we used a Bray-Curtis dissimilarity matrix - sites with similar species composition but different abundances are plotted further apart.
                    </span>
                    </span> indicates strong species turnover between sites, showing that different areas are shaped by distinct ecological communities. Analysing this helps <b>uncover ecological processes across space, identify priority conservation areas, understand habitat and gene pool connectivity, and ensure the persistence of species with limited dispersal or specialised niches</b>. By mapping these patterns, we can better design restoration strategies that reinforce natural connectivity, buffer ecosystems against disturbance, and support biodiversity persistence across fragmented or human-modified landscapes.</p>
                    <p> The plot above shows sites with similar species compositions (not accounting for abundances), with sites clustered together representing more overlap. A clear separation between East and West African sites is apparent, and sites along similar precipitation gradients show greater similarity. </p>
            `,
            location: {
                center: [38.18678833, 13.95337],
                zoom: 10,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm1-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' }
            ],
            onChapterExit: []
        },
        {
            id: 's7.1',
            alignment: 'fully',
            hidden: false,
            title: '',
            image: '',
            description: `
            <div style="background-color: white; padding: 10px; margin-bottom: 20px;">
            <img src="assets/bc_adm1.png" alt="Descriptive Alt Text" style="margin-bottom: 20px;">
            </div>
            <p> Another way of visualising differences in species composition between sites is through a dissimilarity matrix. These are usually constructed using composition but weighted by species abundance. Sites that share squares with a darker colour are considered more similar, while those that are lighter show less similarity.  </p>
            <p> The comparison between this plot and the earlier NMDS plot above, reveals some interesting trends. For example, <b>in our NMDS (which looks at species-presence only) Tigray in Ethiopia and Fatick in Senegal show very different species composition (points are very far apart), but in our Bray-Curtis plot which accounts for abundance, these two regions show a moderate level of similarity (shown by the darker green squares)</b>.</p>
            <p> While this might seem counterintuitive, it reveals that <b>these two regions likely share a handful of highly-dominant species</b>. Indeed, further inspection reveals that these two sites share just four species, but one in particular, <i> Faidherbia albida</i> dominates species counts in each. This likely reflects targeted restoration interventions (e.g., farmer preference or FMNR promotion), but also shows this species' adaptability across ecologies as diverse as the dry Afromontane forests of Tigray and Sudano-Sahelian parklands of Fatick. </p>
            `,
            location: {
                center: [38.18678833, 13.95337],
                zoom: 10,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm1-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' },
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' }
            ],
            onChapterExit: []
        },
        {
            id: 's7.1',
            alignment: 'fully',
            hidden: false,
            title: 'Indicator species',
            image: '',
            description: `
                <p> Certain species act as strong indicators of local ecological conditions. Our indicator species analysis, based on site-level presence data, identified several species found exclusively in one country across the entire dataset, showing the strong biogeographic structuring of dryland flora across FMNR landscapes.</p>

                <iframe src="assets/dominant_species_table.html"
                        width="100%" height="600"
                        style="border: none; margin: 20px 0;"
                        title="Indicator Species Table"
                        loading="lazy"></iframe>
                <p> Distince ecological signatures exist across countries - <i>Acacia etbaica</i> was exclusive to Ethiopia; <i>Acacia dudgeonii</i> to Ghana; and <i>Combretum collinum</i> to Kenya. In West Africa, <i>Parkinsonia aculeata</i> was found only in Mali, <i>Cordyla pinata</i> only in Senegal, and <i>Grewia holstii</i> - notably with nearly 10,000 observations - was exclusive to Niger. <i>Grewia subspathulata</i> was recorded solely in Somalia, though in low abundance, suggesting localised habitat preference.</p>
                <p> <b>These findings highlight the ways that FMNR practices interact with existing ecological and cultural filters that shape species persistence and distribution, strengthening the case for restoration approaches that build on native species assemblages and biogeographic context, rather than generic species mixes.</b></p>
            `,
            location: {
              center: [38.18678833, 13.95337],
              zoom: 10,
              pitch: 0,
              bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
              { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
              { action: 'visibility', layer: 'adm1-iucn-clean', visibility: 'none' },
              { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' },
              { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
              { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' }
            ],
            onChapterExit: []
          },             
        {
            id: 'hero-beta',
            alignment: 'center',
            hidden: false,
            staticBackground: true,
            backgroundColor: '#004d40',
            title: '',
            description: `
                <div class="hero-text-overlay">
                <h1 class="hero-title">Biodiversity and ecosystem function</h1>
                </div>
            `,
            image: '', 
            location: null, // no map fly
            mapAnimation: '',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },          
        {
            id: 's8', //INCLUDE IN THIS CHAPTER NEAT GRAPHIC OF TC-SOC & TC-EROSION. 
            alignment: 'fully',
            hidden: false,
            title: 'Tree cover, soil health, and biodiversity ',
            image: 'assets/biodiv_dryland.jpg',
            description: '<p> <b>Restoring soil function is a critical goal of dryland ecosystem rehabilitation</b>, particularly in regions where land degradation has led to less productivity, biodiversity, and resilience. Soil organic carbon (SOC) is a key indicator of soil health - influencing water retention, nutrient cycling, and aggregate stability, while also contributing to global climate mitigation through carbon sequestration. SOC dynamics are however, driven by complex, interacting feedbacks between above- and below-ground ecological processes.</p>'+
            '<p> Tree cover is one factor that can influence SOC levels, by <b>altering microclimates, increasing leaf litter input, and supporting root-mediated carbon transfer to the soil</b>. Research increasingly shows the effectiveness of restoration in building SOC often depends not only on the presence of trees, but on which species are present, their functional roles, and how they interact with the existing soils and climatic context [6]. These relationships can be complex, especially in dryland systems, where episodic rainfall, high evapotranspiration, and soil texture can limit carbon gains, even under increasing aboveground biomass.</p>',
            location: {
                center: [-4.85639944, 12.22194],
                zoom: 10,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm1-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' }
            ],
            onChapterExit: []
        },  
        {
            id: 's8',  
            alignment: 'fully',
            hidden: false,
            title: 'Tree cover as a consistent predictor of soil organic carbon',
            image: 'assets/Fig33_treecover_effects_on_LH.png',
            description: '<p> <b>Identifying the biophysical drivers of SOC recovery is critical for designing evidence-based, context-sensitive restoration strategies.</b> This is especially relevant in FMNR-dominated landscapes, where interventions rely on the ecological potential of the site and the socio-economic realities of land users.</p>'+
            '<p> Clear results emerged from our analysis of tree cover with SOC - a positive correlation of tree-cover with SOC gains is observed in all countries, except Kenya, which saw a negative relationship. A number fo reasons might explain this negative relationship, from low ground cover (grasses, other herbaceous species), to overgrazing or strong climate-driven events like floods or fires. In Ethiopia, by contrast, a strong positive relationship emerged. This could be owing to many different factors, but many of Ethiopia\'s restoration sites were on sloped terrain where SOC losses are exacerbated by wind and water erosion on slopes, and where the soil stabilising effect of trees is especially impactful, but may also reflect other factors not captured in the data. </p>',
            location: {
                center: [-4.85639944, 12.22194],
                zoom: 10,
                pitch: 60,
                bearing: 10,
                speed: 0.5,
                curve: 1.5
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm1-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' }
            ],
            onChapterExit: []
        },
        {
            id: 's8', 
            alignment: 'fully',
            hidden: false,
            title: 'The relationship between biodiversity and soil health is complex',
            image: 'assets/scatt_qD_SOC_tc1.png',
            description: '<p> While a consistent relationship between increases in tree cover and improvements in soil organic carbon (SOC) can be observed, no clear additional effect of biodiversity on SOC or erosion recovery is seen. This may reflect data limitations rather than actual ecological trends, as biodiversity patterns in dryland systems are often highly localised, with lots of spatial variation, factors obscured when aggregated to coarse administrative scales as was done for this analysis.</p>'+
            '<p> <b>Functional diversity rather than species count itself, might also be the more relevant driver,</b> particularly for FMNR, where the presence of deep-rooted nitrogen-fixers like <em>Faidherbia albida</em> can disproportionately improve soil structure and nutrient cycling. Additionally, soil health responses to biodiversity often exhibit lagged dynamics, emerging over longer timescales than tree cover-driven changes, particularly in degraded or compacted soils. Other feedbacks like herbivory, competition, or recurring disturbance, can mask biodiversity’s influence in ways that aren’t easily captured by simple models.</p>'+
            '<p> <b>The absence of a statistical signal doesn\'t necessarily mean biodiversity is irrelevant. Other critical ecosystem services like buffering against climatic extremes, supporting key ecosystem functions like pollination and seed dispersal, and preserving cultural connections mean biodiversity should be prioritised in FMNR practice.</b></p>',
            location: {
                center: [-4.85639944, 12.22194],
                zoom: 10,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                { action: 'visibility', layer: 'adm0-clean', visibility: 'none' },
                { action: 'visibility', layer: 'adm1-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'hex-density-adm1', visibility: 'none' },
                { action: 'visibility', layer: 'adm2-iucn-clean', visibility: 'none' },
                { action: 'visibility', layer: 'ssa-cepf-pa', visibility: 'none' }
            ],
            onChapterExit: []
        },                             
    ]
};
