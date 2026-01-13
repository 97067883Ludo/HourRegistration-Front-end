<script setup>
  import router from "@/router/index.js";
  import {useProjectState} from "@/state/ProjectState.js";
  import {onMounted, ref} from "vue";
  
  const projectState = useProjectState();
  const project = ref([]);
  const sortBy = ref([{ key: 'name', order: 'asc' }])
  const groupBy = ref([{ key: 'weekno', order: 'asc' }, { key: 'status', order: 'asc' }])
  const headers = [
    { key: 'data-table-group', title: 'week' },
    { title: 'start time', key: 'startTime' },
    { title: 'endTime', key: 'endTime' },
  ]
  async function loadProject() {
    let result = await projectState.GetProject(router.currentRoute.value.params.id)
    for (let i = 0; i < result.data.hours.length; i++) {
      result.data.hours[i].weekno = getISOWeekNumber(result.data.hours[i].endTime)
    }
    project.value = result.data.hours
    console.log(project.value)
  }

  onMounted(async () => {
    await loadProject();
    console.log(project.value);
  })

  function getISOWeekNumber(dateString) {
    let date = new Date(dateString);
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

    return weekNo;
  }
  
</script>

<template>
  <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <div style="width: 80%; display: flex; flex-direction: column;">
      <div>
         <v-data-table
            :group-by="groupBy"
            :headers="headers"
            :items="project"
            :sort-by="sortBy"
            item-value="name"
        ></v-data-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
  
</style>