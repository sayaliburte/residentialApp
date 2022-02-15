import { StyleSheet, Text, View } from 'react-native';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

const Card=(props)=>{
    return(<View style={{borderRightColor:'blue'}}>
         {props.children}
         </View>
    )
}

export default Card;