import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
export default class CarCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    takePicture = async function () {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            this.props.takePictureDone(data);
            //alert(JSON.stringify(data.uri))
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 8 }}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                    />
                    <View style={styles.carTipThumb}>
                    

                    

                    </View>
                </View>


                <View style={{ flex: 2, justifyContent: 'center', }}>


                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style={styles.capture}
                    >

                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        position: "absolute",
        bottom: 10,
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    carTipThumb: {
        width: 100,
        height: 80,
        position: "absolute",
        backgroundColor: "white",
        left: 0,
        bottom: 0
    }
});