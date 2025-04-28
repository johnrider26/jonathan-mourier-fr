<template>
    <div class="contact-form">
        <form @submit.prevent="submitForm" class="flex flex-col gap-4" id="contact-form">
            <div class="flex flex-col sm:flex-row sm:gap-4">
                <div class="flex flex-col flex-1">
                    <label for="firstname" class="text-sm font-medium mb-2">{{t('contact.first-name')}}</label>
                    <input 
                        type="text" 
                        id="firstname" 
                        v-model="formData.firstname"
                        class="border-b border-black py-2 focus:border-primary focus:outline-none" 
                        placeholder="John" 
                        required />
                </div>
                <div class="flex flex-col flex-1">
                    <label for="name" class="text-sm font-medium mb-2">{{t('contact.last-name')}}</label>
                    <input 
                        type="text" 
                        id="name" 
                        v-model="formData.lastname"
                        class="border-b border-black py-2 focus:border-primary focus:outline-none" 
                        placeholder="Doe" 
                        required />
                </div>
            </div>
            <div class="flex flex-col">
                <label for="mail" class="text-sm font-medium mb-2">{{t('contact.email')}}</label>
                <input 
                    type="email" 
                    id="mail" 
                    v-model="formData.email"
                    class="border-b border-black py-2 focus:border-primary focus:outline-none" 
                    placeholder="john.doe@example.com" 
                    required />
            </div>
            <div class="flex flex-col">
                <label for="message" class="text-sm font-medium mb-2">{{t('contact.message')}}</label>
                <textarea 
                    id="message" 
                    v-model="formData.message"
                    class="border-b border-black py-2 focus:border-primary focus:outline-none" 
                    placeholder="Lorem ipsum ..." 
                    rows="4" 
                    required></textarea>
            </div>
            <div class="flex items-center justify-end my-4">
                <input 
                    type="checkbox" 
                    id="rgpd" 
                    v-model="formData.rgpd"
                    class="mr-2" 
                    required />
                <label for="rgpd" class="text-sm font-medium">{{t('contact.rgpd')}}</label>
            </div>
            <div class="flex justify-end">
                <button type="submit" class="secondary rounded-2xl flex border-2 border-[#AEB4BD] items-center bg-[#0E161B] py-2 px-12">
                    {{ t('contact.send') }}
                </button>
            </div>
            <div>
                <altcha-widget
                challengeurl="https://captcha.jonathanmourier.fr"
                floating
              ></altcha-widget>
            </div>

        </form>
    </div>
</template>

<script>
import { useTranslations } from '@i18n/utils';
export default {
    name: 'FormContact',
    data() {
        return {
            formData: {
                firstname: '',
                lastname: '',
                email: '',
                message: '',
                rgpd: false
            }
        }
    },
    setup(props) {
        console.log('props', props);
        const t = useTranslations(props.locale);
        console.log('t', t);
        return { t };
    },
    methods: {
        submitForm() {
            // Handle form submission here
            console.log('Form submitted:', this.formData)
            // Reset form after submission
            this.formData = {
                firstname: '',
                lastname: '',
                email: '',
                message: '',
                rgpd: false
            }
        }
    }
}
</script>

<style scoped>
.contact-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.submit-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-btn:hover {
    background-color: #45a049;
}
</style>