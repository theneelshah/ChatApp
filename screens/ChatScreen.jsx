import React, { Component } from "react";
import {
	Platform,
	KeyboardAvoidingView,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Fire";

export default class ChatScreen extends Component {
	state = {
		messages: [],
	};

	get user() {
		return {
			_id: Fire.uid,
			name: this.props.navigation.state.params.name,
		};
	}

	componentWillUnmount() {
		Fire.off();
	}

	componentDidMount() {
		Fire.get((message) =>
			this.setState((previous) => ({
				messages: GiftedChat.append(previous.messages, message),
			}))
		);
	}

	render() {
		const chat = (
			<GiftedChat
				messages={this.state.messages}
				onSend={Fire.send}
				user={this.user}
			/>
		);

		if (Platform.OS === "android") {
			return (
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior="padding"
					keyboardVerticalOffset={30}
					enabled
				>
					{chat}
				</KeyboardAvoidingView>
			);
		}

		return <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>;
	}
}
