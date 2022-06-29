<template>
	<button
		:class="'float-button cu-btn shadow-blur button-hover  text-sl'"
		:style="{right: offset,backgroundColor: getFabBackgroundColor}">
		<text
			:class="getFabIcon"
			:style="{color:getFabIconColor}"></text>
			<slot></slot>
	</button>
</template>

<script>
	export default {
		name: "cui-float-action-button",
		data() {
			return {

			};
		},
		computed:{
			getFabBackgroundColor(){
				return this.action ? this.actionStyle.onBg : this.actionStyle.offBg;
			},
			getFabIcon(){
				return this.action ? this.actionStyle.on : this.actionStyle.off;
			},
			getFabIconColor(){
				return this.action ? this.actionStyle.onColor : this.actionStyle.offColor;
			}
			
		},
		onLoad() {
			console.log("propr status:", this.actionStyle)
		},
		props: {
			action: {
				type: Boolean,
				default: false
			},
			offset: {
				type: String,
				default: "5vw"
			},
			actionStyle: {
				type: Object,
				default: {
					on: "cuIcon-right",
					off: "cuIcon-cascades",
					onColor: 'orange',
					offColor: 'white',
					onBg: 'white',
					offBg: 'orange'
				}
			},
		}
	}
</script>

<style >
	.float-button {
		z-index: 9;
		position: fixed;
		bottom: 5%;
		width: 15vw;
		height: 15vw;
		border-radius: 50%;
	}
</style>
