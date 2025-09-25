<template>
  <div class="container">
    <div class="col-md-12 col-12 col-sm-12">
      <div class="card">
        <div class="table-responsive">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th></th>
              </tr>
              <tr v-for="task, index in tasks" :key="index">
                <td>{{task.text}}</td>
                <td>{{ task.duration }}</td>
                <td>
                  <a class="btn btn-primary btn-action mr-1" data-toggle="tooltip" title="" data-original-title="Edit"><i
                      class="bi bi-pencil"></i></a>
                  <a class="btn btn-danger btn-action" data-toggle="tooltip" title=""
                    data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?"
                    data-confirm-yes="alert('Deleted')" data-original-title="Delete"><i class="bi bi-trash"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  }
}
</script>
