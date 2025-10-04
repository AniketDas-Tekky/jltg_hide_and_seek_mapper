import osmnx as ox
import folium

def Run():
    place = "SF"
    tags = {"highway": "bus_stop", "nextbus:route": "38"}
    gdf_busline = ox.features.features_from_place(place, tags)

    m = folium.Map()
    folium.GeoJson(gdf_busline.to_json(), name="Muni 38").add_to(m)


if __name__ == "__main__":
    Run()