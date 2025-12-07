import { defineAction } from 'astro:actions';
import { addLike, getLikes } from './repository';
import type { LikesResponse } from './model';
import { Resend } from 'resend';
import { RESEND_API_KEY, FROM_EMAIL, TO_EMAIL } from 'astro:env/server';
import { z } from 'astro:schema';

const resend = new Resend(RESEND_API_KEY);

export const server = {
  addLike: defineAction<LikesResponse>({
    async handler(slug) {
      return { likes: await addLike(slug) };
    },
  }),
  getLikes: defineAction<LikesResponse>({
    async handler(slug) {
      return { likes: await getLikes(slug) };
    },
  }),
  sendSubscription: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email('Invalid email'),
    }),
    handler: async input => {
      try {
        const { email } = input;
        await resend.emails.send({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          subject: 'Nuevo suscriptor al newsletter',
          html: `<p><strong>${email}</strong> se ha suscrito a nuestra newsletter!</p>`,
        });
        return { success: true, message: 'E-mail sent successfully ✅' };
      } catch (error) {
        return { success: false, message: 'There was an error sending the e-mail ❌' };
      }
    },
  }),
};
