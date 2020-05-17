import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    PB:[],
    ProjectCode:0,
    sosAmount:0,
  },
  getters:{
   Pesonalcost: state =>{
     let paarray=[]
     let parry2=[]
     state.PB[0][0].Personalcosts.map(data=>{
        if(data.Type=="TotalCost"){
        paarray.push({PersonalCostId:data.PersonalCostId,ProjectBudjetId:data.ProjectBudjetId,Personalcosts:data.JobTitle,Units:data.Units,Total_No_of_Units:data.NoOfUnits,Total_Unit_value:data.UnitValue,Total_Total_cost:data.Total})
        }
        else if(data.Type=="Year1"){
        paarray.push({ProjectBudjetId:data.ProjectBudjetId,year1_Units:data.Units,Year1_No_of_Units:data.NoOfUnits,Year1_Unit_value:data.UnitValue,Detailed_Explanation:data.Description,Year1_Total_cost:data.Total,Actions:''})
        }
     }
     )
     for(let i=0; i<(paarray.length); i += 2){
        parry2.push({...paarray[i],
                     ...paarray[i+1] })
     }
     return parry2
     },

      Travel: state=>{
        let Taarray=[]
     let Tarry2=[]
     state.PB[0][0].Travels.map(data=>{
        if(data.Type=="TotalCost"){
        Taarray.push({TravelId:data.TravelId,ProjectBudjetId:data.ProjectBudjetId,Personalcosts:data.JobTitle,Units:data.Units,Total_No_of_Units:data.NoOfUnits,Total_Unit_value:data.UnitValue,Total_Total_cost:data.Total})
        }
        else if(data.Type=="Year1"){
        Taarray.push({ProjectBudjetId:data.ProjectBudjetId,year1_Units:data.Units,Year1_No_of_Units:data.NoOfUnits,Year1_Unit_value:data.UnitValue,Detailed_Explanation:data.Description,Year1_Total_cost:data.Total,Actions:''})
        }
     }
     )
     for(let i=0; i<(Taarray.length); i += 2){
        Tarry2.push({...Taarray[i],
                     ...Taarray[i+1] })
     }
     return Tarry2
     },
      Subcontracting: state=>{
     let scaarray=[]
     let scarry2=[]
     state.PB[0][0].SubContractings.map(data=>{
        if(data.Type=="TotalCost"){
        scaarray.push({SubContractingId:data.SubContractingId,ProjectBudjetId:data.ProjectBudjetId,Personalcosts:data.JobTitle,Units:data.Units,Total_No_of_Units:data.NoOfUnits,Total_Unit_value:data.UnitValue,Total_Total_cost:data.Total})
        }
        else if(data.Type=="Year1"){
        scaarray.push({ProjectBudjetId:data.ProjectBudjetId,year1_Units:data.Units,Year1_No_of_Units:data.NoOfUnits,Year1_Unit_value:data.UnitValue,Detailed_Explanation:data.Description,Year1_Total_cost:data.Total,Actions:''})
        }
     }
     )
     for(let i=0; i<(scaarray.length); i += 2){
        scarry2.push({...scaarray[i],
                     ...scaarray[i+1] })
     }
     return scarry2
     },
      
     ProjectSupplie: state=>{
      let psaarray=[]
      let psarry2=[]
     state.PB[0][0].ProjectSupplies.map(data=>{
        if(data.Type=="TotalCost"){
        psaarray.push({ProjectSupplieId:data.ProjectSupplieId,ProjectBudjetId:data.ProjectBudjetId,Personalcosts:data.JobTitle,Units:data.Units,Total_No_of_Units:data.NoOfUnits,Total_Unit_value:data.UnitValue,Total_Total_cost:data.Total})
        }
        else if(data.Type=="Year1"){
        psaarray.push({ProjectBudjetId:data.ProjectBudjetId,year1_Units:data.Units,Year1_No_of_Units:data.NoOfUnits,Year1_Unit_value:data.UnitValue,Detailed_Explanation:data.Description,Year1_Total_cost:data.Total,Actions:''})
        }
     }
     )
     for(let i=0; i<(psaarray.length); i += 2){
        psarry2.push({...psaarray[i],
                     ...psaarray[i+1] })
     }
     return psarry2
    },
    MAW: state=>{
      let mawaarray=[]
      let mawarry2=[]
     state.PB[0][0].MAWs.map(data=>{
        if(data.Type=="TotalCost"){
        mawaarray.push({MAWId:data.MAWId,ProjectBudjetId:data.ProjectBudjetId,Personalcosts:data.JobTitle,Units:data.Units,Total_No_of_Units:data.NoOfUnits,Total_Unit_value:data.UnitValue,Total_Total_cost:data.Total})
        }
        else if(data.Type=="Year1"){
        mawaarray.push({ProjectBudjetId:data.ProjectBudjetId,year1_Units:data.Units,Year1_No_of_Units:data.NoOfUnits,Year1_Unit_value:data.UnitValue,Detailed_Explanation:data.Description,Year1_Total_cost:data.Total,Actions:''})
        }
     }
     )
     for(let i=0; i<(mawaarray.length); i += 2){
        mawarry2.push({...mawaarray[i],
                     ...mawaarray[i+1] })
     }
     return mawarry2
     },
      PEM: state=>{
      let pemaarray=[]
      let pemarry2=[]
     state.PB[0][0].PEMs.map(data=>{
        if(data.Type=="TotalCost"){
        pemaarray.push({PEMId:data.PEMId,ProjectBudjetId:data.ProjectBudjetId,Personalcosts:data.JobTitle,Units:data.Units,Total_No_of_Units:data.NoOfUnits,Total_Unit_value:data.UnitValue,Total_Total_cost:data.Total})
        }
        else if(data.Type=="Year1"){
        pemaarray.push({ProjectBudjetId:data.ProjectBudjetId,year1_Units:data.Units,Year1_No_of_Units:data.NoOfUnits,Year1_Unit_value:data.UnitValue,Detailed_Explanation:data.Description,Year1_Total_cost:data.Total,Actions:''})
        }
     }
     )
     for(let i=0; i<(pemaarray.length); i += 2){
        pemarry2.push({...pemaarray[i],
                     ...pemaarray[i+1] })
     }
     return pemarry2
},
LOC:state=>{
      let locaarray=[]
      let locarry2=[]
     state.PB[0][0].LOCs.map(data=>{
        if(data.Type=="TotalCost"){
        locaarray.push({LOCId:data.LOCId,ProjectBudjetId:data.ProjectBudjetId,Personalcosts:data.JobTitle,Units:data.Units,Total_No_of_Units:data.NoOfUnits,Total_Unit_value:data.UnitValue,Total_Total_cost:data.Total})
        }
        else if(data.Type=="Year1"){
        locaarray.push({ProjectBudjetId:data.ProjectBudjetId,year1_Units:data.Units,Year1_No_of_Units:data.NoOfUnits,Year1_Unit_value:data.UnitValue,Detailed_Explanation:data.Description,Year1_Total_cost:data.Total,Actions:''})
        }
     }
     )
     for(let i=0; i<(locaarray.length); i += 2){
        locarry2.push({...locaarray[i],
                     ...locaarray[i+1] })
     }
     return locarry2

},
SOS:state=>{
    return state.sosAmount
}
},
  mutations: {
     ProjectBudjet: (state,payload)=>{
       state.PB=[]
       state.PB.push(payload)
      state.ProjectCode=state.PB[0][0].ProjectBudjetId
    },
    SOSinfo:(state,payload)=>{
        state.sosAmount=payload
    }
  },
  actions: {
    getData:(context,id)=>{
      let getUrl=`http://localhost:3000/PB/data/all/${id}`

      return new Promise((resolve)=>{
        resolve(axios.get(getUrl).then(results=>{
        context.commit('ProjectBudjet',results.data.result)
        }))

    })
  },
  getSos:(context)=>{
    return new Promise((resolve)=>{
        resolve(axios.get('http://localhost:3000/SOS/data').then(results=>{
        context.commit('SOSinfo',results.data.result[0].Amount)
        }))
        
        })

    }
},
  modules: {
  }
})