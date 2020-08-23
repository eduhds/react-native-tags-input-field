import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function TagsInputField({
    tags,
    onChangeTags,
    containerStyle,
    inputStyle,
    removeIcon,
    label,
    labelStyle,
    inputProps,
    separator,
    editable = true
}) {
    const [text, setText] = useState('');
    return (
        <View style={[Styles.container, containerStyle]}>
            {label && editable ? <Text style={labelStyle}>{label}</Text> : []}
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
                        disabled={!editable}
                        onPress={() =>
                            onChangeTags(tags.filter(t => t !== item))
                        }
                        style={Styles.tag}>
                        <Text style={{ fontSize: 16 }}>{item}</Text>
                        {editable && <>{removeIcon || <RemoveIcon />}</>}
                    </TouchableOpacity>
                ))}
                {editable && (
                    <TextInput
                        {...inputProps}
                        style={[Styles.input, inputStyle]}
                        value={text}
                        onChangeText={_text => {
                            if (parseWhen(_text, separator)) {
                                if (
                                    tags.indexOf(
                                        _text
                                            .trim()
                                            .replace(separator || '', '')
                                    ) === -1
                                ) {
                                    let newTags = [...tags, text.trim()];
                                    onChangeTags(newTags);
                                    setText('');
                                } else {
                                    if (!separator) setText(_text.trim());
                                    else setText(_text.replace(separator, ''));
                                }
                            } else {
                                if (!separator) setText(_text.trim());
                                else setText(_text);
                            }
                        }}
                        onKeyPress={({ nativeEvent }) => {
                            if (
                                !text &&
                                nativeEvent.key === 'Backspace' &&
                                tags.length > 0
                            ) {
                                onChangeTags(
                                    tags.filter(
                                        t => t !== tags[tags.length - 1]
                                    )
                                );
                            }
                        }}
                    />
                )}
            </View>
        </View>
    );
}

const parseWhen = (text, separator) => {
    separator = separator ? [separator] : [' ', ',', ';', '\n'];
    return separator.indexOf(text.charAt(text.length - 1)) !== -1;
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
