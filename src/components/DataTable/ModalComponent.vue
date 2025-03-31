<template>
  <div class="fixed inset-0 flex items-center justify-center bg-indigo-500 opacity-25">

  </div>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg w-1/3">
      <h2 class="text-xl font-bold mb-4">{{ item ? 'Editar' : 'Cadastrar' }}</h2>
      <form @submit.prevent="validateAndSave">
        <div v-for="field in fields" :key="field.key" class="mb-4">
          <label class="block text-gray-700">{{ field.label }}</label>
          <input v-model="form[field.key]" :type="field.type || 'text'" class="border p-2 rounded w-full"
            :class="{ 'border-red-500': errors[field.key] }" />
          <p v-if="errors[field.key]" class="text-red-500 text-sm">{{ errors[field.key] }}</p>
        </div>
        <div class="flex justify-end space-x-2">
          <button type="button" @click="$emit('close')" class="bg-gray-500 text-white px-4 py-2 rounded">
            Cancelar
          </button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    item: Object,
    fields: Array,
  },
  data() {
    return {
      form: this.item ? { ...this.item } : {},
      errors: {},
    };
  },
  methods: {
    validateAndSave() {
      this.errors = {};
      let isValid = true;

      this.fields.forEach((field) => {
        if (field.required && !this.form[field.key]) {
          this.errors[field.key] = `${field.label} é obrigatório.`;
          isValid = false;
        }
      });

      if (isValid) {
        this.$emit('save', this.form);
        this.$emit('close');
      }
    },
  },
};
</script>