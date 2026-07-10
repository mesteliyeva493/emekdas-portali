import * as yup from "yup";

export const employeeSchema = yup.object().shape({  fin: yup
    .string()
    .required("Fin daxil edilməlidir")
    .matches(
      /^[A-Za-z0-9]{7}$/,
      "FİN tam 7 simvoldan (hərf və rəqəm) ibarət olmalıdır",
    ),
  idSeria: yup.string().optional(),
  idNumber: yup
    .string()
    .required("Ş.V. nömrəsi daxil edilməlidir")
    .matches(/^\d+$/, "Ş.V. nömrəsi yalnız rəqəmlərdən ibarət olmalıdır"),

  firstName: yup
    .string()
    .required("Ad daxil edilməlidir")
    .min(2, "Ad minimum 2 simvol olmalıdır"),

  lastName: yup
    .string()
    .required("Soyad daxil edilməlidir")
    .min(2, "Soyad minimum 2 simvol olmalıdır"),
  fatherName: yup.string().optional(),

  gender: yup.string().required("Cinsinizi seçin"),
  birthDate: yup
    .date()
    .typeError("Düzgün bir tarix daxil edin")
    .required("Doğum tarixi məcburidir")
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      "İşçinin yaşı minimum 18 olmalıdır!",
    ),
  birthPlace: yup.string().required("Doğulduğu yeri seçin"),

  maritalStatus: yup.string().required("Ailə vəziyyətini seçin"),
  nationality: yup.string().required("Milliyyətinizi seçin"),
  citizenship: yup.string().required("Vətəndaşlığınızı seçin"),
  documentIssuer: yup.string().required("Sənədi verən qurumu seçin"),
  documentIssueDate: yup
    .date()
    .typeError("Düzgün bir tarix daxil edin")
    .required("Sənədin verilmə tarixi məcburidir")
    .max(new Date(), "Sənədin verilmə tarixi bugündən sonra ola bilməz")
    .min(
      yup.ref("birthDate"),
      "Sənədin verilmə tarixi doğum tarixindən əvvəl ola bilməz",
    ),

  documentExpiryDate: yup
    .date()
    .typeError("Düzgün bir tarix daxil edin")
    .nullable()
    .optional()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(
      yup.ref("documentIssueDate"),
      "Son etibarlılıq tarixi verilmə tarixindən sonra olmalıdır",
    ),

  ssn: yup
    .string()
    .nullable()
    .optional()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .matches(/^\d+$/, {
      message: "SSN yalnız rəqəmlərdən ibarət olmalıdır (Numeric format)",
      excludeEmptyString: true,
    }),

  profilePicture: yup
    .mixed()
    .nullable()
    .optional()
    .test("fileSize", "Faylın ölçüsü maksimum 5MB ola bilər", (value) => {
      if (!value) {
        return true;
      } else if (typeof window !== "undefined" && value instanceof FileList) {
        return value.length === 0 || value[0].size <= 5 * 1024 * 1024;
      } else if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024;
      }

      return true;
    }),

  documentScan: yup
    .mixed()
    .nullable()
    .optional()
    .test("fileSize", "Faylın ölçüsü maksimum 5MB ola bilər", (value) => {
      if (!value) {
        return true;
      } else if (typeof window !== "undefined" && value instanceof FileList) {
        return value.length === 0 || value[0].size <= 5 * 1024 * 1024;
      } else if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024;
      }

      return true;
    }),

  registrationAddress: yup
    .string()
    .required("Qeydiyyat ünvanı mütləq seçilməlidir"),
  isSameAddress: yup.boolean().optional(),
  actualAddress: yup.string().required("Faktiki ünvan mütləq seçilməlidir"),
  phonePrefix: yup.string().required("Prefiks seçilməlidir"),
  phoneNumber: yup
    .string()
    .required("Mobil nömrə daxil edilməlidir")
    .matches(/^\d{7}$/, "Mobil nömrə tam 7 rəqəmdən ibarət olmalıdır"),

  email: yup
    .string()
    .required("E-mail daxil edilməlidir")
    .email("Düzgün bir e-mail formatı daxil edin"),

  fax: yup
    .string()
    .nullable()
    .optional()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

  postalCode: yup
    .string()
    .nullable()
    .optional()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

    employmentHistory: yup.array().of(
  yup.object({
    organizationName: yup.string().required("Təşkilatın adını seçin"),
    structuralUnit: yup.string().required("Struktur bölməni seçin"),
    position: yup.string().required("Vəzifəni seçin"),
    isMainJob: yup.string().optional(), 
    employmentDocument: yup.mixed().nullable().optional(), 
    isGovernmentEmployee: yup.string().required("Dövlət qulluqçusu olub-olmadığını seçin"),
    startDate: yup
      .date()
      .typeError("Düzgün tarix seçin")
      .transform((value, originalValue) => (originalValue === "" ? null : value))
      .required("Başlama tarixi vacibdir"),
    isCurrentlyWorking: yup.boolean().default(false),
    endDate: yup
      .date()
      .typeError("Düzgün tarix seçin")
      .transform((value, originalValue) => (originalValue === "" ? null : value))
      .nullable()
      .when("isCurrentlyWorking", {
        is: false,
        then: (schema) => schema.required("Bitmə tarixi vacibdir"),
        otherwise: (schema) => schema.nullable().optional(),
      }),
    terminationReason: yup.string().nullable().when("isCurrentlyWorking", {
      is: false,
      then: (schema) => schema.required("Xitam maddəsini seçin"),
      otherwise: (schema) => schema.nullable().optional(),
    }),
  })
),
});

export type EmployeeFormValues = yup.InferType<typeof employeeSchema>;