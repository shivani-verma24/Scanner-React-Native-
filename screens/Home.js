import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { icons, images, COLORS, SIZES, FONTS } from '../constants'
import { featuresData, specialPromoData } from "../assets/Data";


const Home = () => {
    const [features, setFeatures] = useState(featuresData)
    const [specialPromos, setSpecialPromos] = useState(specialPromoData)

    function renderHeader() {
        return (
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerText}>Hello</Text>
                    <Text style={styles.headerTextTwo}>by Shivani verma</Text>
                </View>

                {/* <View style={styles.headerBell}> */}
                    <TouchableOpacity style={styles.headerTouchableOpacity}>
                        <Image source={icons.bell} style={styles.bellImage} />
                        <View style={styles.redDotView}></View>
                    </TouchableOpacity>
                {/* </View> */}
            </View>
        )
    }


    function renderBanner() {
        return (
            <View style= {styles.banner}>
                <Image source={images.banner}
                resizeMode= "cover"
                style= {styles.bannerImage}
                />
            </View>
        )
    }


    function renderFeatures() {

        const FeaturesHeaderComponent = () => {
            return (
                <View style= {{marginBottom: SIZES.padding * 2}}>
                    <Text style= {{fontSize: SIZES.h3, color: COLORS.black}}>Features</Text>
                </View>
            )
        }
        const renderItem = ({item}) => {
            return (
                <TouchableOpacity style={styles.featuresTouchableOpacity}
                    onPress={() => console.log(item.description)}
                >
                    <View style={[styles.featuresImageView, {backgroundColor: item.backgroundColor}]}>
                        <Image source={item.icon}
                            resizeMode="contain"
                            style={[styles.featuresImage, {tintColor: item.color}]}
                        />
                    </View>
                    
                    <Text style={styles.featuresDescription}>{item.description}</Text>
         
                </TouchableOpacity>
            )
        }

        return (
           <FlatList
           ListHeaderComponent={FeaturesHeaderComponent}
           data = {features}
           numColumns= {4}
           columnWrapperStyle={{ justifyContent: 'space-between' }}
           keyExtractor={item => `${item.id}`}
           renderItem={renderItem}
           style= {{marginTop: SIZES.padding * 2}}
           />
        )
    }



    function renderPromos() {

        const HeaderComponent = () => {
            return (
                <View>
                    {renderHeader()}
                    {renderBanner()}
                    {renderFeatures()}
                    {renderPromoHeader()}
                </View>
            )
        }

        const renderPromoHeader = () =>{
            return (
                <View style= {{ flexDirection: 'row', marginBottom: SIZES.padding }}>

                    <View style= {{ flex: 1 }}>
                    <Text style= {{fontSize: SIZES.h3, color: COLORS.black}}>Special Promos</Text>
                    </View>

                    <TouchableOpacity onPress={() => console.log("View All")}>
                        <Text style= {styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity style={styles.promoTouchableOpacity}
                    onPress={() => console.log(item.title)}
                >
                    <View style={styles.promoImageView}>
                        <Image source={images.promoBanner}
                            resizeMode="cover"
                            style={styles.promoImage}
                        />
                    </View>

                    <View style={styles.promoTextView}>
                        <Text style={styles.promoTitle}>{item.title}</Text>
                        <Text style={styles.promoDescription}>{item.description}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                data={specialPromos}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent= {
                    <View style= {{ marginBottom: 50 }}></View>
                }
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderPromos()}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    promoTouchableOpacity: {
        marginVertical: SIZES.base,
        width: SIZES.width / 2.5
    },
    promoImageView: {
        height: 80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.primary
    },
    promoImage: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    promoTextView: {
        padding: SIZES.padding,
        backgroundColor: COLORS.lightGray,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    promoTitle: {
        fontSize: SIZES.h4,
        lineHeight: 22,
        color: COLORS.black
    },
    promoDescription: {
        fontSize: SIZES.body4,
        lineHeight: 22,
        color: COLORS.black
    },
    header: {
        flexDirection: 'row',
        marginVertical: SIZES.padding * 2
    },
    headerText: {
        fontSize: SIZES.h1,
        lineHeight: 36,
        color: COLORS.black
    },
    headerTextTwo: {
        fontSize: SIZES.body2,
        lineHeight: 30,
        color: COLORS.gray
    },
    headerBell: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTouchableOpacity: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray
    },
    bellImage: {
        width: 20,
        height: 20,
        tintColor: COLORS.secondary
    },
    redDotView: {
        position: 'absolute',
        top: -5,
        right: -5,
        height: 10,
        width: 10,
        backgroundColor: COLORS.red,
        borderRadius: 5
    },
    banner: {
        height: 120,
        borderRadius: 20
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    featuresTouchableOpacity: {
        marginBottom: SIZES.padding * 2,
        width: 60,
        alignItems: 'center'
    },
    featuresImageView: {
        height: 50,
        width: 50,
        marginBottom: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    featuresImage: {
        height: 20,
        width: 20, 
    },
    featuresDescription: {
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: SIZES.body4,
        lineHeight: 22,
        color: COLORS.black
    },
    viewAll: {
        color: COLORS.gray,
        fontSize: SIZES.body4, 
        lineHeight: 22
    }
    
})

export default Home;