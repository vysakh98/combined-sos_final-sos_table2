<template>
<div id="second-table">
<v-data-table
:headers="headers"
:items="items">
<template #top>
<div class="top-div">
<v-tooltip bottom>
<template #activator="{ on }">
<v-btn id="add" class="white--text" @click="add" v-on="on"><v-icon class="black--text">add</v-icon></v-btn>
</template>
<span>add row</span>
</v-tooltip>
</div>
</template>
<template #item.Personalcosts="{item}">
  <td v-if="editable && editindex==items.indexOf(item)">
     <v-text-field class="tx1" v-model="Personalcosts"></v-text-field>
  </td>
  <td id="td1" v-else>{{item.Personalcosts}}</td>
</template>
<template #item.Units="{item}">
  <td v-if="editable && editindex==items.indexOf(item)">
     <v-text-field class="tx1" v-model="Units"></v-text-field>
  </td>
  <td id="td2" v-else>{{item.Units}}</td>
</template>
<template #item.Total_No_of_Units="{item}">
  <td v-if="editable && editindex==items.indexOf(item)">
     <v-text-field class="tx1" v-model="Total_No_of_Units" type="number"></v-text-field>
  </td>
  <td id="td3" v-else>{{item.Total_No_of_Units}}</td>
</template>
<template #item.Total_Unit_value="{item}">
  <td v-if="editable && editindex==items.indexOf(item)">
     <v-text-field class="tx1" v-model="Total_Unit_value" type="number"></v-text-field>
  </td>
  <td id="td4"  v-else>{{item.Total_Unit_value}}</td>
</template>
<template #item.Total_Total_cost="{item}">
<td v-if="editable && editindex==items.indexOf(item)"></td>
<td id="td5" v-else><v-chip color="blue">€{{item.Total_Total_cost}}</v-chip></td>
</template>
<template #item.year1_Units="{item}">
  <td v-if="editable && editindex==items.indexOf(item)">
     <v-text-field class="tx1" v-model="year1_Units"></v-text-field>
  </td>
  <td id="td2" v-else>{{item.year1_Units}}</td>
</template>
<template #item.Year1_No_of_Units="{item}">
  <td v-if="editable && editindex==items.indexOf(item)">
     <v-text-field class="tx1" v-model="Year1_No_of_Units" type="number"></v-text-field>
  </td>
  <td id="td6" v-else>{{item.Year1_No_of_Units}}</td>
</template>
<template #item.Year1_Unit_value="{item}">
  <td v-if="editable && editindex==items.indexOf(item)">
     <v-text-field class="tx1" v-model="Year1_Unit_value" type="number"></v-text-field>
  </td>
  <td id="td7" v-else>{{item.Year1_Unit_value}}</td>
</template>
<template #item.Year1_Total_cost="{item}">
<td v-if="editable && editindex==items.indexOf(item)"></td>
<td id="td8" v-else><v-chip color="blue">€{{item.Year1_Total_cost}}</v-chip></td>
</template>
<template  #item.Detailed_Explanation="{item}">
  <td v-if="editable && editindex==items.indexOf(item)">
     <v-text-field id="txt" @keydown="save($event,item,item.Total_Total_cost,item.Year1_Total_cost)" v-model="Detailed_Explanation"></v-text-field>
  </td>
  <td id="td" v-else>{{item.Detailed_Explanation}}</td>
</template>
<template #item.Actions="{item}">
<v-tooltip bottom>
<template #activator="{ on }">
<v-icon id="del" @click="deleteitem(item)"  v-on="on">delete</v-icon>
</template>
<span>delete</span>
</v-tooltip>
<v-tooltip bottom>
<template #activator="{ on }">
<v-icon id="edit" @click="edit(item)" v-on="on">edit</v-icon>
</template>
<span>edit</span>
</v-tooltip>
</template>
<template #body.append>
<tr>
<td>Subtotal</td>
<td></td>
<td></td>
<td></td>
<td id="Totalsum"><v-chip color="blue">€{{Totalsum}}</v-chip></td>
<td></td>
<td></td>
<td></td>
<td id="year1sum"><v-chip color="blue">€{{year1sum}}</v-chip></td>
<td></td>
<td></td>
</tr>
</template>
</v-data-table>
</div>
</template>
<script>
export default{
props:{
 items:{
 type:Array
 },
 ProjectCode:{
 type:Number
 }
 },
	data(){
	return{
	submitStatus:'',
	count:-1,/* sets editability to newly pushed objects */
	editindex:null,
	editable:false,
	Total_No_of_Units:'',
	Total_Unit_value:'',
	Total_Total_cost:'',
	Year1_No_of_Units:'',
	Year1_Unit_value:'',
	Year1_Total_cost:'',
	Units:'',
	year1_Units:'',
	Personalcosts:'',
	Detailed_Explanation:'',
	Totalsum:0,
	year1sum:0,
  delIndex1:0,
  delIndex2:0,
  EditIndex1:0,
  EditIndex2:0,


	headers:[{text:'',value:'Personalcosts',sortable:false},
  {text:'',value:'Units',sortable:false},
  {text:'',value:'Total_No_of_Units',sortable:false},
  {text:'',value:'Total_Unit_value',sortable:false},
  {text:'',value:'Total_Total_cost',sortable:false},
  {text:'',value:'year1_Units',sortable:false},
  {text:'',value:'Year1_No_of_Units',sortable:false},
  {text:'',value:'Year1_Unit_value',sortable:false},
  {text:'',value:'Year1_Total_cost',sortable:false},
  {text:'',value:'Detailed_Explanation',sortable:false},
  {text:'',value:'Actions',sortable:false}],


	}
},
methods:{

/* add method pushes an empty object to the items array */

add(){
  this.ProjectBudjetId=parseInt(this.ProjectCode)

  this.$axios.get('http://localhost:3000/LOC/data').then(results=>{
  const itemsLength=(results.data.result.length-1)
  console.log(itemsLength)
  if(itemsLength==-1){
  this.LOCId=0
  }
  else if(itemsLength>=0){
  this.LOCId=(results.data.result[itemsLength].LOCId)+1
  }
  this.count=this.count+1
  this.editindex=this.count
  this.submitStatus='post'
  this.editable=true
  this.items.push({LOCId:this.LOCId,Personalcosts:'', Units:'',Total_No_of_Units:'',Total_Unit_value:'',Total_Total_cost:''
  ,year1_Units:'',Year1_No_of_Units:'',Year1_Unit_value:'',Year1_Total_cost:'',Detailed_Explanation:'',Actions:''})
  this.$axios({
  method: 'post',
  url:'http://localhost:3000/LOC/data/post/',
  headers: {}, 
  data: {
    LOCId:this.LOCId,
    JobTitle :'',
    Units:'',
    NoOfUnits:0,
    UnitValue:0,
    Type:'TotalCost', 
    Description:'',
    ProjectBudjetId:this.ProjectBudjetId,
  }
}).then(result=>{
  console.log(result)
  this.$axios({
  method: 'post',
  url:'http://localhost:3000/LOC/data/post/',
  headers: {}, 
  data: {
    LOCId:this.LOCId+1,
    JobTitle:'',
    Units:'',
    NoOfUnits:0,
    UnitValue:0,
    Type:'Year1', 
    Description:'',
    ProjectBudjetId:this.ProjectBudjetId
  }
}).then(result=>{
  console.log(result)
})
})
  })

.catch(err=>{
  console.log(err)
})

},

/* edit function enable edit functionality to the select object */

edit(item){
  let editindex = this.items.indexOf(item)
  this.editindex=editindex
  this.submitStatus='edit'
  this.editable=true
  },

  /* delete function deltes the selected object */

deleteitem(item){
   this.count=this.count-1
   this.LOCId=this.LOCId-1
   const index = this.items.indexOf(item)
   this.delIndex1=this.items[index].LOCId
   this.delIndex2=(this.items[index].LOCId)+1
   this.Totalsum=this.Totalsum-this.items[index].Total_Total_cost
   this.year1sum=this.year1sum-this.items[index].Year1_Total_cost
   this.items.splice(index, 1)
   this.$emit('localofficecost',{subtotal:this.Totalsum,year1sum:this.year1sum})

   this.$axios.delete(`http://localhost:3000/LOC/data/delete/${this.delIndex1}`).then(result=>{
   console.log(result)
   })
   this.axios.delete(`http://localhost:3000/LOC/data/delete/${this.delIndex2}`).then(result=>{
   console.log(result)
   })
},

/* depending on the submit status which is set by either the edit function or add function the save function will either post an item to the items array or edit an existing item in the array , with help of axios the changes will be reflected in the database also */


save(e,item,totalcost,year1cost){
  console.log(totalcost)
  console.log(year1cost)
  if(e.keyCode === 13 || e.keyCode== 9){
  const index=this.items.indexOf(item)
  this.items[index].Total_No_of_Units=this.Total_No_of_Units
  this.items[index].Total_Unit_value=this.Total_Unit_value
  this.items[index].Year1_No_of_Units=this.Year1_No_of_Units
  this.items[index].Year1_Unit_value=this.Year1_Unit_value
  this.items[index].Detailed_Explanation=this.Detailed_Explanation
  this.items[index].Personalcosts=this.Personalcosts
  this.items[index].Units=this.Units
  this.items[index].year1_Units=this.year1_Units

  if(this.items[index].Total_No_of_Units=='' || this.items[index].Total_Unit_value=='' )
  {
   this.Total_Total_cost=0
   this.items[index].Total_Total_cost=this.Total_Total_cost
  }
  else{
   this.Total_Total_cost=(this.Total_No_of_Units*this.Total_Unit_value)
   this.items[index].Total_Total_cost=this.Total_Total_cost
  }
   if(this.items[index].Year1_No_of_Units=='' || this.items[index].Year1_Unit_value=='' ){
     this.Year1_Total_cost=0
     this.items[index].Year1_Total_cost=this.Year1_Total_cost
   }
   else{
    this.Year1_Total_cost=(this.Year1_No_of_Units*this.Year1_Unit_value)
     this.items[index].Year1_Total_cost=this.Year1_Total_cost
   }


  if(this.submitStatus==='post'){
  this.Totalsum=this.Totalsum+this.items[index].Total_Total_cost
  this.year1sum=this.year1sum+this.items[index].Year1_Total_cost

  this.$axios({
  method: 'put',
  url:'http://localhost:3000/LOC/data/update/all',
  headers: {}, 
  data: {
    LOCId:this.LOCId,
    JobTitle:this.Personalcosts,
    Units:this.Units,
    NoOfUnits:parseInt(this.Total_No_of_Units),
    UnitValue:parseInt(this.Total_Unit_value),
    Type:'TotalCost', 
    Total:this.Total_Total_cost,
    Description:this.Detailed_Explanation,
    ProjectBudjetId:this.ProjectBudjetId
  }
}).then(result=>{
  console.log(result)
  
})
this.$axios({
  method: 'put',
  url:'http://localhost:3000/LOC/data/update/all',
  headers: {}, 
  data: {
    LOCId:this.LOCId+1,
    JobTitle:this.Personalcosts,
    Units:this.year1_Units,
    NoOfUnits:parseInt(this.Year1_No_of_Units),
    UnitValue:parseInt(this.Year1_Unit_value),
    Total:parseInt(this.Year1_Total_cost),
    Type:'Year1', 
    Description:this.Detailed_Explanation,
    ProjectBudjetId:this.ProjectBudjetId
  }
}).then(result=>{
  console.log(result)
})

.catch(err=>{
  console.log(err)
})

this.$emit('localofficecost',{subtotal:this.Totalsum,year1sum:this.year1sum})
  }

  if(this.submitStatus==='edit'){
  if(totalcost==0){
  console.log('enterd')
  this.Totalsum=this.Totalsum+this.items[index].Total_Total_cost
  this.$emit('localofficecost',{subtotal:this.Totalsum,year1sum:this.year1sum})
  }
  else{
  console.log('enterd2')
  this.Totalsum=(this.Totalsum-totalcost)
  this.Totalsum=this.Totalsum+this.items[index].Total_Total_cost
  this.$emit('localofficecost',{subtotal:this.Totalsum,year1sum:this.year1sum})
  }
  if(year1cost==0){
  console.log('enterd')
  this.year1sum=this.year1sum+this.items[index].Year1_Total_cost
  this.$emit('localofficecost',{subtotal:this.Totalsum,year1sum:this.year1sum})
  }
  else{
   console.log('enterd4')
  this.year1sum=(this.year1sum-year1cost)
  this.year1sum=this.year1sum+this.items[index].Year1_Total_cost
  this.$emit('localofficecost',{subtotal:this.Totalsum,year1sum:this.year1sum})
  }
  }

  this.EditIndex1=this.items[this.editindex].LOCId
  this.EditIndex2=(this.items[this.editindex].LOCId)+1

  this.$axios({
  method: 'put',
  url:'http://localhost:3000/LOC/data/update/all',
  headers: {}, 
  data: {
    LOCId:this.EditIndex1,
    JobTitle:this.Personalcosts,
    Units:this.Units,
    NoOfUnits:parseInt(this.Total_No_of_Units),
    UnitValue:parseInt(this.Total_Unit_value),
    Type:'TotalCost', 
    Total:this.Total_Total_cost,
    Description:this.Detailed_Explanation,
    ProjectBudjetId:this.ProjectCode
  }
}).then(result=>{
  console.log(result)
  
})
this.$axios({
  method: 'put',
  url:'http://localhost:3000/LOC/data/update/all',
  headers: {}, 
  data: {
    LOCId:this.EditIndex2,
    JobTitle:this.Personalcosts,
    Units:this.year1_Units,
    NoOfUnits:parseInt(this.Year1_No_of_Units),
    UnitValue:parseInt(this.Year1_Unit_value),
    Total:parseInt(this.Year1_Total_cost),
    Type:'Year1', 
    Description:this.Detailed_Explanation,
    ProjectBudjetId:this.ProjectCode
  }
}).then(result=>{
  console.log(result)
})

.catch(err=>{
  console.log(err)
})



   this.editable=false

  this.Total_No_of_Units=''
  this.Total_Unit_value=''
  this.Year1_No_of_Units=''
  this.Year1_Unit_value=''
  this.Detailed_Explanation=''
  this.Year1_Total_cost=''
  this.Total_Total_cost=''
  this.Personalcosts=''
  this.year1_Units=''
  this.Units=''

  }
}
},

/* since the items array is recived as props from parrent component the watch object watches the changes happening in items array */

watch:{
  items(){
  let Totalsum=0
  let Year1sum=0
  if(this.items.length==this.$store.getters.LOC.length){

   this.Totalsum=0
   this.year1sum=0
   this.$emit('localofficecost',{subtotal:this.Totalsum,year1sum:this.year1sum})

   if(this.items.length>0){
   this.count=this.items.length-1
   this.$store.getters.LOC.map(data=>{
   Totalsum=Totalsum+data.Total_Total_cost
   Year1sum=Year1sum+data.Year1_Total_cost
}) 
  this.Totalsum=Totalsum
  this.year1sum=Year1sum
  this.$emit('localofficecost',{subtotal:this.Totalsum,year1sum:this.year1sum})
  }
  }
  }
},
computed:{
},
created(){
},

updated(){

}

}
</script>

<style scopped>
#second-table th:nth-child(1){
width:300px !important;
}
.top-div{
  height:50px;
  background-color:grey;
}
#add{
position:absolute;
left:93%;
margin-top:5px;
}
.heading{
	font-size:2.5em;
}
#edit{
  margin-left:2px;
}
#td{
	width:450px !important;
}
#Totalsum{
	padding-left:30px;
}
#year1sum{
	padding-left:32px;
}
.tx1{
	width:50px;
}
#txt{
	width:100px;
}

</style>