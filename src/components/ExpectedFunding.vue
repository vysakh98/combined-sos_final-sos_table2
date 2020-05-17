<template>
<v-container id="t-container">
<v-toolbar class="grey" flat>
<v-toolbar-title flat class="white--text display-1">Expected Source of Income</v-toolbar-title>
</v-toolbar>
<v-data-table
:items="items"
:headers="header"
class="elevation-1">
<template #item.Percent>
<td><v-chip color="blue" dark>{{Sospercent}}%</v-chip></td>
</template>
<template #item.Amount="{item}">
<td v-if="editable">
<v-text-field class="input" @keydown="sosSave($event,item)" v-model="Amount" label="Edit" type="number"></v-text-field>
</td>
<td v-else class="input" @click="editable=true">{{item.Amount}}</td>
</template>

<template #body.append="{headers}">
<tr :colspan="headers.length">
 <td :colspan="headers.length" id="table-td">
    <subtable  v-on:Subtotal="Total($event)" v-on:sosContibution="sosAmount($event)"></subtable>
 </td>
</tr>
<tr :colspan="headers.length">
<td id="ext">Expected-total</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><v-chip color="blue" dark>{{ExpectedTotal}}</v-chip></td>
<td></td>
</tr>
<tr :colspan="headers.length">
<td>Others-percent</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><v-chip color="blue" dark>{{OthersPercent}}%</v-chip></td>
</tr>
</template>
</v-data-table>
</v-container>
</template>


<script>
import subtable from '@/components/OtherContributions.vue'
export default{
    data()
    {
    return{
    editable:true,
    total:null,
    Amount:null,
    Organization:'',
    Description:'',
     items:[{Organization:'SOS contribution sought in application',Amount:null,Percent:''}],
       header:[ {text: '',
            align: 'start',
            sortable: false,
            value: 'Organization'},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
           {text:'Amount(€)',value:'Amount',class:'h'},
           {text:'Percentage',value:'Percent'}]
       }
},
methods:{

/*if soscontribution is changed update request will be sent */

sosSave(e,item){
if(e.keyCode == 13 || e.keyCode == 9){
if(item.Amount!=this.Amount){
  this.items[0].Amount=this.Amount
  this.editable=false
  this.$axios.put(`http://localhost:3000/sos/data/update/${this.Amount}`).then(result=>{
  console.log(result)
  })
  .then(()=>{
  this.$store.dispatch('getSos')
  })
  }
else if(item.Amount==this.Amount){
  this.editable=false
  this.$store.dispatch('getSos')
  }
  }
  },

  /* recives the other contributions total */

  Total:function(e){
  this.total=e.total
  },

  /* recives Soscontribution  from Soscontributions table */

  sosAmount(e){
  if(e.sosMoney==0){
  this.Amount=0
  this.items[0].Amount=this.Amount
  }
  this.Amount=e.sosMoney
  this.items[0].Amount=this.Amount
 },
 },
components:{
  'subtable':subtable
},

/*calulate ExpectedTotal Sospercent and Otherspercent according to the changes in required values */

computed:{
  ExpectedTotal(){
  if(this.Amount==0){
  return 0
  }
  else{
  return parseInt(this.Amount)+this.total
  }
  },
   Sospercent(){
  if(this.Amount==0){
  return 0
  }
  else{
  let Total=this.total+parseInt(this.Amount)
  return Math.round((this.Amount/Total)*100)
  }
  },
  OthersPercent:function(){
  if(this.Amount==0){
  return 0
  }
  else{
  let Total=parseInt(this.Amount)+this.total
  return Math.round((this.total/Total)*100)
  }
  }
  },
}
</script>
 

<style scoped>
.input{
  width:100px;
}
#table-td{
  padding-left:0px;
  padding-right:0px;
  border:1px solid black;
}
.elevation-1{
  border:1px solid black;
}
.h{
  font-Size:1.5em;
}
thead{
  font-size:1.5em;
}
.v-small-dialog__activator{
  width:100px;
  border-bottom:2px solid black;
}
#t-container{
  margin-top:10px;
}
</style>