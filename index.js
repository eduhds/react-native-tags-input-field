import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function TagInputField({
    tags,
    onChangeTags,
    containerStyle,
    inputStyle,
    removeIcon
}) {
    const [text, setText] = useState('');
    return (
        <View style={[Styles.container, containerStyle]}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                {tags.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() =>
                            onChangeTags(tags.filter(t => t !== item))
                        }
                        style={Styles.tag}>
                        <Text style={{ fontSize: 16 }}>{item}</Text>
                        {removeIcon || <RemoveIcon />}
                    </TouchableOpacity>
                ))}
                <TextInput
                    style={[Styles.input, inputStyle]}
                    value={text}
                    onChangeText={_text => {
                        if (parseWhen(_text)) {
                            if (tags.indexOf(_text.trim()) === -1) {
                                let newTags = [...tags, text.trim()];
                                onChangeTags(newTags);
                                setText('');
                            } else {
                                setText(_text.trim());
                            }
                        } else {
                            setText(_text.trim());
                        }
                    }}
                    onKeyPress={({ nativeEvent }) => {
                        if (
                            !text &&
                            nativeEvent.key === 'Backspace' &&
                            tags.length > 0
                        ) {
                            onChangeTags(
                                tags.filter(t => t !== tags[tags.length - 1])
                            );
                        }
                    }}
                />
            </View>
        </View>
    );
}

const parseWhen = text => {
    return [' ', ',', ';', '\n'].indexOf(text.charAt(text.length - 1)) !== -1;
};

const RemoveIcon = () => (
    <View
        style={{
            padding: 5,
            borderRadius: 100,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 5
        }}>
        <Text
            style={{
                margin: 0,
                fontSize: 10,
                fontWeight: 'bold',
                color: 'white'
            }}>
            ❌
        </Text>
    </View>
);

const Styles = StyleSheet.create({
    container: {
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    tag: {
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 4,
        alignItems: 'center',
        marginRight: 5,
        marginVertical: 2
    },
    input: {
        flex: 1,
        minWidth: 100,
        backgroundColor: 'transparent',
        color: 'black'
    }
});
