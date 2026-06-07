import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const practiceAttemptSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    mode: {
      type: String,
      enum: ["free", "guided"],
      required: true,
    },
    prompt: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
    originalText: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },
    feedback: {
      correctedText: {
        type: String,
        required: true,
      },
      summaryHindi: {
        type: String,
        required: true,
      },
      mistakes: [
        {
          wrong: {
            type: String,
            required: true,
          },
          correct: {
            type: String,
            required: true,
          },
          explanationHindi: {
            type: String,
            required: true,
          },
        },
      ],
      scores: {
        grammar: {
          type: Number,
          required: true,
          min: 0,
          max: 10,
        },
        clarity: {
          type: Number,
          required: true,
          min: 0,
          max: 10,
        },
        vocabulary: {
          type: Number,
          required: true,
          min: 0,
          max: 10,
        },
        overall: {
          type: Number,
          required: true,
          min: 0,
          max: 10,
        },
      },
      level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true,
      },
      weakAreas: [
        {
          type: String,
          trim: true,
        },
      ],
      personalizedExercises: [
        {
          type: String,
          trim: true,
        },
      ],
      motivationHindi: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

practiceAttemptSchema.plugin(mongoosePaginate);

export const PracticeAttempt = mongoose.model(
  "PracticeAttempt",
  practiceAttemptSchema
);
