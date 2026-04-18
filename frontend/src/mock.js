export const projects = [
  {
    id: 1,
    number: '01',
    name: 'LINE rocking chair',
    type: 'Parametric · Fabricated',
    year: '2024',
    description: 'A rocking chair designed through computational methods. The form emerged from a parametric definition that balanced structural stability with ergonomic requirements. CNC-fabricated from laminated plywood.',
    process: 'The chair began as a Grasshopper definition exploring arc geometries and weight distribution. Multiple iterations tested different radii and contact points. Final geometry was nested for CNC cutting, then laminated and assembled by hand.',
    tools: 'Rhinoceros 3D · Grasshopper · GHPython · V-Ray',
    location: 'Delhi',
    heroImage: 'line-chair-hero.jpg',
    images: ['line-chair-01.jpg', 'line-chair-02.jpg', 'line-chair-03.jpg', 'line-chair-04.jpg']
  },
  {
    id: 2,
    number: '02',
    name: 'KOMFORT1 lounger',
    type: 'Fabricated · Built',
    year: '2024',
    description: 'A minimal lounger designed for outdoor use. The geometry prioritizes comfort through tested angles and support points. Built from powder-coated steel and teak slats.',
    process: 'Physical prototyping informed the digital model. Steel frame was laser-cut and welded. Teak slats were milled to exact dimensions. Assembly designed for disassembly and maintenance.',
    tools: 'Rhinoceros 3D · AutoCAD · Photoshop',
    location: 'Delhi',
    heroImage: 'komfort1-hero.jpg',
    images: ['komfort1-01.jpg', 'komfort1-02.jpg', 'komfort1-03.jpg']
  },
  {
    id: 3,
    number: '03',
    name: 'LAITLUM wall art',
    type: 'Data · CNC · Installed',
    year: '2023',
    description: 'A 3x2m wall installation translating topographic data into physical relief. The piece represents the Laitlum canyon in Meghalaya through vertical displacement mapped from elevation data.',
    process: 'Elevation data was processed through Python scripts to generate surface geometry. The model was sectioned into CNC-millable panels. Material: high-density foam, finished with texture coating. Installed across six panels.',
    tools: 'Rhinoceros 3D · Grasshopper · GHPython · BSolid CNC',
    location: 'Private residence, Gurgaon',
    heroImage: 'laitlum-hero.jpg',
    images: ['laitlum-01.jpg', 'laitlum-02.jpg', 'laitlum-03.jpg', 'laitlum-04.jpg']
  },
  {
    id: 4,
    number: '04',
    name: 'Mortar House',
    type: 'Interior · Built',
    year: '2024',
    description: 'A 1200 sq.ft apartment interior in South Delhi. The design emphasizes material honesty and spatial continuity. Custom joinery and built-in storage throughout.',
    process: 'The interior was designed around existing structural constraints. Custom furniture was detailed in Revit and fabricated locally. Material palette: exposed concrete, oak veneer, black steel. Completed in four months.',
    tools: 'Revit · Lumion · Photoshop · InDesign',
    location: 'New Delhi',
    heroImage: 'mortar-house-hero.jpg',
    images: ['mortar-house-01.jpg', 'mortar-house-02.jpg', 'mortar-house-03.jpg']
  },
  {
    id: 5,
    number: '05',
    name: 'UNIT1 welcome console',
    type: 'Parametric · Fabricated',
    year: '2023',
    description: 'A reception console for a corporate office. The front surface is parametrically patterned with variable depth cells. CNC-milled from solid surface material.',
    process: 'The pattern definition controlled cell depth based on proximity to user interaction zones. The surface was milled in sections and joined on site. Integrated cable management and concealed storage.',
    tools: 'Rhinoceros 3D · Grasshopper · Lunchbox · BSolid CNC',
    location: 'Gurgaon',
    heroImage: 'unit1-hero.jpg',
    images: ['unit1-01.jpg', 'unit1-02.jpg', 'unit1-03.jpg']
  },
  {
    id: 6,
    number: '06',
    name: 'Museum of Architecture',
    type: 'Computational · Academic',
    year: '2021',
    description: 'A thesis project exploring adaptive museum spaces. The building envelope responds to interior program through a computational facade system that modulates light and views.',
    process: 'The facade was developed through environmental analysis in Grasshopper. Kangaroo physics simulations tested structural feasibility. The project remained unbuilt but was exhibited at the college end-of-year show.',
    tools: 'Rhinoceros 3D · Grasshopper · Kangaroo · Ladybug · V-Ray',
    location: 'Academic project',
    heroImage: 'museum-hero.jpg',
    images: ['museum-01.jpg', 'museum-02.jpg', 'museum-03.jpg', 'museum-04.jpg']
  },
  {
    id: 7,
    number: '07',
    name: 'The Edge',
    type: 'Architecture · Housing',
    year: '2024',
    description: 'A residential project on a sloped site in Himachal Pradesh. The design works with the topography, stepping down the hillside. Three volumes connected by glazed circulation.',
    process: 'Site analysis drove the massing strategy. The building was modeled in Revit with detailed construction documentation. Local stone and timber specified for climate appropriateness. Currently in construction.',
    tools: 'Revit · Lumion · Photoshop',
    location: 'Himachal Pradesh',
    heroImage: 'the-edge-hero.jpg',
    images: ['the-edge-01.jpg', 'the-edge-02.jpg', 'the-edge-03.jpg']
  },
  {
    id: 8,
    number: '08',
    name: 'Forest Floors',
    type: 'Architecture · Housing',
    year: '2025',
    description: 'A residential development of four units in Dehradun. The project balances density with privacy through strategic massing and landscape integration. Scheduled completion late 2025.',
    process: 'The site plan emerged from solar studies and view analysis. Each unit maintains visual privacy while sharing landscape amenities. Construction documentation completed, site work underway.',
    tools: 'Revit · Lumion · Photoshop · InDesign',
    location: 'Dehradun',
    heroImage: 'forest-floors-hero.jpg',
    images: ['forest-floors-01.jpg', 'forest-floors-02.jpg', 'forest-floors-03.jpg']
  }
];

export const studios = [
  {
    name: '7day3io',
    years: '2019 – 2022',
    description: 'Freelance computational design studio with two batchmates. 100+ projects — product visualisation, residential design, event fabrication, UAE clients.',
    images: ['7day3io-01.jpg', '7day3io-02.jpg', '7day3io-03.jpg']
  },
  {
    name: 'Grull.Work',
    years: '2022 – 2024',
    description: 'Creative execution studio. CGI video, 3D animation, and VFX production for large brands and agencies.',
    images: ['grull-work-01.jpg', 'grull-work-02.jpg', 'grull-work-03.jpg']
  },
  {
    name: 'Grull.Design',
    years: '2024',
    description: 'CGI and design direction. Computational design meets creative production.',
    images: ['grull-design-01.jpg', 'grull-design-02.jpg', 'grull-design-03.jpg']
  }
];

export const processSteps = [
  {
    number: '01',
    title: 'Define the logic',
    description: 'The problem becomes a Grasshopper definition — parameters, relationships, constraints. The model is the drawing.',
    image: 'gh-canvas.jpg'
  },
  {
    number: '02',
    title: 'Test through geometry',
    description: 'The definition runs, varies, breaks. Bad results are information. Form comes from the system, not from the sketch.',
    image: 'gh-iterations.jpg'
  },
  {
    number: '03',
    title: 'Close the gap',
    description: 'CNC toolpaths from the model. Shop drawings generated, not drawn. Screen to material — no translation loss.',
    image: 'fabrication.jpg'
  }
];

export const videos = [
  { title: 'Architecture and time', placeholder: 'video-01' },
  { title: 'Material systems', placeholder: 'video-02' },
  { title: 'The design process', placeholder: 'video-03' },
  { title: 'Computational thinking', placeholder: 'video-04' }
];