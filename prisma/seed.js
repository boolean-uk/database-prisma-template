const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
  const createdCohort = await prisma.cohort.create({
    data: {
      name: 'Cohort 1',
      teachers: {
        create: {
          name: 'Bob'
        }
      }
    },
    include: {
      teachers: true
    }
  })

  console.log('Created cohort 1', createdCohort)

  const createdTeacher = await prisma.teacher.create({
    data: {
      name: 'Nazar',
      cohorts: {
        create: {
          name: 'Cohort 2'
        }
      }
    },
    include: {
      cohorts: true
    }
  })

  console.log('Created teacher', createdTeacher)

  const connectNewTeacherToCohort = await prisma.teacher.create({
    data: {
      name: 'Jules',
      cohorts: {
        connect: {
          id: 1
        }
      }
    },
    include: {
      cohorts: true
    }
  })

  console.log('Connected new teacher to cohort', connectNewTeacherToCohort)

  const connectNewCohortToTeacher = await prisma.cohort.create({
    data: {
      name: 'Cohort 3',
      teachers: {
        connect: {
          id: 1
        }
      }
    },
    include: {
      teachers: true
    }
  })

  console.log('Connecter new cohort to teacher', connectNewCohortToTeacher)

  process.exit(0)
}

seed()
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
  .finally(() => process.exit(1))
