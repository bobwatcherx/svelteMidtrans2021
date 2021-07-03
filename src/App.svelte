<script >
	import axios from 'axios'
	import { v4 as uuidv4 } from 'uuid';
	let oid = uuidv4();
	let tokenID = "";
	let price = "50000";
	let datauser = {
		name:"",
		last:"",
		email:""
	}

	async function checkID(){
		await axios.post('http://localhost:3000/genID',{
			orderID: oid,
			price:price,
			name:datauser.name,
			last:datauser.last,
			email:datauser.email
		}).then((res)=>{
			tokenID = res.data
		})
	}
	async function pay(){
		await   window.snap.pay(tokenID); 
	}
</script>

<br>
<h1>Price is {price}</h1>
<h1>name is MotorCycle Ninja 200</h1>
<br>
<br>	
<form>
	name : <input type="text" bind:value={datauser.name} name="">
	last : <input type="text" bind:value={datauser.last} name="">
	email : <input type="text" bind:value={datauser.email} name="">
</form>
<button on:click={checkID}>checkout</button>
{#if tokenID !== ""}
<button on:click={pay}>Pay <b> token {tokenID}</b></button>
{/if}

