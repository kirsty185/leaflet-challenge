# Module 15 Challenge

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualise their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualise USGS data that will allow them to better educate the public and other government organisations (and hopefully secure more funding) on issues facing our planet.

 ## Leaflet-Part-1 - Create Earthquake Visualisation 
 1. Choose a dataset to visualise - I chose  Past 7 days, all earthquakes data
 2. Use the URL of this JSON to pull in the data for the visualisation
 3. Import and visualise the data by doing the following:
    * Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
    * Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by colour. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in colour.
    * Include popups that provide additional information about the earthquake when its associated marker is clicked.
    * Create a legend that will provide context for your map data.
 
 
  ## Leaflet-Part-2 - Gather and Plot more data
This part is completely optional.

# References
1. https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json - I ended up using names rather than the reference codes 
2. https://leafletjs.com/examples/quick-start/
3. https://stackoverflow.com/questions/7878076/css-to-lay-out-keys-values-legend-horizontally -
